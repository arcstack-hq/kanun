'use strict';

import { GenericCallable, GenericObject } from "src/Contracts/BaseContract";

class replaceAttributePayload {

    /**
     * Stores the data object
     */
    data: GenericObject;

    /**
     * The message in which attributes will be replaced
     */
    message: string;

    /**
     * Parameters that will be used to replace the attributes
     */
    parameters: string[];


    /**
     * Flag that identifies wether the numeric rule exists or not
     */
    hasNumericRule: boolean;

    /**
     * The function that will be used to format attributes
     */
    getDisplayableAttribute: (key: string) => string;


    constructor(
        data: GenericObject,
        message: string,
        parameters: string[],
        hasNumericRule: boolean,
        getDisplayableAttribute: (key: string) => string
    ) {
        this.data = data;
        this.message = message;
        this.parameters = parameters;
        this.hasNumericRule = hasNumericRule;
        this.getDisplayableAttribute = getDisplayableAttribute;
    }

};

export default replaceAttributePayload;