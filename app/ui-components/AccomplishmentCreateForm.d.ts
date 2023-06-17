/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Skill } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AccomplishmentCreateFormInputValues = {
    title?: string;
    description?: string;
    link?: string;
    engagementID?: string;
    companyID?: string;
    Skills?: Skill[];
};
export declare type AccomplishmentCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    engagementID?: ValidationFunction<string>;
    companyID?: ValidationFunction<string>;
    Skills?: ValidationFunction<Skill>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccomplishmentCreateFormOverridesProps = {
    AccomplishmentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    engagementID?: PrimitiveOverrideProps<AutocompleteProps>;
    companyID?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type AccomplishmentCreateFormProps = React.PropsWithChildren<{
    overrides?: AccomplishmentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AccomplishmentCreateFormInputValues) => AccomplishmentCreateFormInputValues;
    onSuccess?: (fields: AccomplishmentCreateFormInputValues) => void;
    onError?: (fields: AccomplishmentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AccomplishmentCreateFormInputValues) => AccomplishmentCreateFormInputValues;
    onValidate?: AccomplishmentCreateFormValidationValues;
} & React.CSSProperties>;
export default function AccomplishmentCreateForm(props: AccomplishmentCreateFormProps): React.ReactElement;
