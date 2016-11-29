let state = {
    limits: [ {
        daysOver: 0,
        textColor: "#000",
        bgColor: "#66cc66"
    },
    {
        daysOver: 10,
        textColor: "#000",
        bgColor: "#3399ff"
    },
    {
        daysOver: 20,
        textColor: "#000",
        bgColor: "#ff0033"
    } ],
    displayLimits: true,
    startDate: undefined,
    description: "something"
};

const queryKeys = {
    "eventDate": (state, value) => {
        return Object.assign({}, state, { startDate: new Date(value) });
    },
    "eventDescription": (state, value) => {
        return Object.assign({}, state, { description: value });
    },
    "daysBeforeWarning": (state, value) => {
        return Object.assign({}, state, {
            limits: modifyLimit(1, state.limits, parseInt(value, 10))
        });
    },
    "daysBeforeAlerting": (state, value) => {
        return Object.assign({}, state, {
            limits: modifyLimit(2, state.limits, parseInt(value, 10))
        });
    },
    "displayLimits": (state, value) => {
        return Object.assign({}, state, {
            displayLimits: value == "true"
        });
    }
};

const modifyLimit = (idx, limits, newValue) => {
    let limit = Object.assign({}, limits[idx]);

    if (Object.keys(limit).length !== 0) {
        limit.daysOver = newValue;
        return [
           ...limits.slice(undefined, idx),
           limit,
           ...limits.slice(idx+1, undefined)
        ];
    } else {
        return limits;
    }
};

const getCurrentLimit = (limits, startDate) => {
    const { numberOfDaysElapsedSince } = DateUtils;

    return limits.reduce((result, limit) => {
        if (numberOfDaysElapsedSince(startDate) >= limit.daysOver) {
            result = limit;
        }
        return result;
    })
};

const render = {
    "counter": (state) => {
        const { numberOfDaysElapsedSince } = DateUtils;

        if (state.startDate !== undefined) {
            const daysElapsed = numberOfDaysElapsedSince(state.startDate);
            document.getElementById("numberOfDays").textContent = daysElapsed;
        }
    },
    "description": (state) => {
        document.getElementById("eventDescription").textContent = state.description;
    },
    "numberColor": (state) => {
        const limit = getCurrentLimit(state.limits, state.startDate);
        let numberElement = document.getElementById("numberOfDays");

        numberElement.parentElement.style.backgroundColor = limit.bgColor;
        numberElement.parentElement.style.color = limit.textColor;
    },
    "limits": (state) => {
        if (!state.displayLimits) {
            return;
        }

        const currentLimit = getCurrentLimit(state.limits, state.startDate);

        let holder = document.querySelector(".limits");
        let newHolder = holder.cloneNode(false);
        let limitElements = state.limits.map((limit) => {
            let limitElement = document.createElement("span");

            limitElement.textContent = ">= " + limit.daysOver;
            limitElement.style.backgroundColor = limit.bgColor;
            limitElement.style.color = limit.textColor;

            if (limit == currentLimit) {
                limitElement.classList.add("current");
            }

            return limitElement;
        });

        limitElements.forEach((el) => {
            newHolder.appendChild(el);
        });
        holder.parentNode.replaceChild(newHolder, holder);
    },
    "resetButton": (state) => {
        const { queryParameters, marshalQueryString } = QueryStringUtils;
        const { getZeroHourToday } = DateUtils;

        let holder = document.querySelector(".reset");
        let newHolder = holder.cloneNode(false);
        let button = document.createElement("button");

        button.textContent = "Reset counter";
        button.addEventListener("click", (e) => {
            e.preventDefault();
            if (window.confirm("Reset the counter?")) {
                const today = getZeroHourToday();
                const newQueryParams = Object.assign({}, queryParameters, {
                    eventDate: [
                        today.getFullYear(),
                        today.getMonth()+1,
                        today.getDate()
                    ].join("-")
                });
                window.location.search = marshalQueryString(newQueryParams);
            }
        });

        newHolder.appendChild(button);
        holder.parentNode.replaceChild(newHolder, holder);
    }
};

(() => {
    const { queryParameters } = QueryStringUtils;

    Object.keys(queryParameters).filter((key) => {
        return key in queryKeys;
    }).forEach((key) => {
        state = queryKeys[key](state, queryParameters[key]);
    });

    Object.keys(render).forEach((key) => render[key](state));
})();

