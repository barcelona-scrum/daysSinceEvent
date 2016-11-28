let state = {
    limits: [ {
        daysOver: 0,
        textColor: "#000",
        bgColor: "#66cc66"
    },
    {
        name: "daysBeforeWarning",
        daysOver: 10,
        textColor: "#000",
        bgColor: "#3399ff"
    },
    {
        name: "daysBeforeAlerting",
        daysOver: 20,
        textColor: "#000",
        bgColor: "#ff0033"
    } ],
    startDate: Date.now(),
    description: "something"
};

const modifyLimit = (name, limits, newValue) => {
    let limit = limits.find((limit) => {
        return limit.name !== undefined && limit.name === name
    });
    limit.daysOver = newValue;
    return [
       ...limits.slice(undefined, limits.indexOf(limit)),
       limit,
       ...limits.slice(limits.indexOf(limit)+1, undefined)
    ];
};

const getCurrentLimit = (state) => {
    return state.limits.reduce((result, limit) => {
        if (getNumberOfDaysElapsed(state.startDate) >= limit.daysOver) {
            result = limit;
        }
        return result;
    })
};

const getNumberOfDaysElapsed = (startDate) => {
    return Math.floor((new Date() - startDate)/(1000*60*60*24));
}

const queryKeys = {
    "eventDate": (state, value) => {
        return Object.assign({}, state, { startDate: new Date(value) });
    },
    "eventDescription": (state, value) => {
        return Object.assign({}, state, { description: value });
    },
    "daysBeforeWarning": (state, value) => {
        return Object.assign({}, state, {
            limits: modifyLimit("daysBeforeWarning", state.limits, value)
        });
    },
    "daysBeforeAlerting": (state, value) => {
        return Object.assign({}, state, {
            limits: modifyLimit("daysBeforeAlerting", state.limits, value)
        });
    }
};

const queryParameters = (() => {
    const query = window.location.search.split("#");
    const queryParams = query[0].substring(1);
    const queryHash = query[1];
    return queryParams.split("&").reduce((result, str) => {
        const keyValue = str.split("=");
        if (keyValue[1] !== undefined) {
            result[keyValue[0]] = unescape(keyValue[1]);
        }
        return result;
    }, {});
})();

const elements = {
    "counter": () => {
        const daysElapsed = getNumberOfDaysElapsed(state.startDate);
        document.getElementById("numberOfDays").textContent = daysElapsed;
    },
    "description": () => {
        document.getElementById("eventDescription").textContent = state.description;
    },
    "numberColor": () => {
        const numberOfDays = getNumberOfDaysElapsed(state.startDate);
        const limit = getCurrentLimit(state);
        let numberElement = document.getElementById("numberOfDays");

        numberElement.parentElement.style.backgroundColor = limit.bgColor;
        numberElement.parentElement.style.color = limit.textColor;
    }
};

(() => {
    Object.keys(queryParameters).filter((key) => {
        return key in queryKeys;
    }).forEach((key) => {
        state = queryKeys[key](state, queryParameters[key]);
    });

    Object.keys(elements).forEach((key) => elements[key]());
})();

