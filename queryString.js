var QueryStringUtils = {
    unmarshalQueryString: (queryString) => {
        const [params, hash] = queryString.split("#");
        return params.substring(1).split("&").reduce((result, str) => {
            const keyValue = str.split("=");
            if (keyValue[1] !== undefined) {
                result[keyValue[0]] = unescape(keyValue[1]);
            }
            return result;
        }, {});
    },
    marshalQueryString: (queryParams) => {
        const queryString = Object.keys(queryParams).map((key) => {
            return escape(key) + "=" + escape(queryParams[key])
        }).join("&");
        if (queryString.length > 0) {
            return "?" + queryString;
        } else {
            return "";
        }
    },
    queryParameters: {}
};

{
    const QSU = QueryStringUtils;
    QSU.queryParameters = QSU.unmarshalQueryString(window.location.search);
}
