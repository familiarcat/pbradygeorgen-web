/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Accomplishment, Engagement as Engagement0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AccomplishmentUpdateFormInputValues = {
    title?: string;
    description?: string;
    link?: string;
    companyID?: string;
    Engagement?: Engagement0;
};
export declare type AccomplishmentUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    companyID?: ValidationFunction<string>;
    Engagement?: ValidationFunction<Engagement0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccomplishmentUpdateFormOverridesProps = {
    AccomplishmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    companyID?: PrimitiveOverrideProps<AutocompleteProps>;
    Engagement?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type AccomplishmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: AccomplishmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    accomplishment?: Accomplishment;
    onSubmit?: (fields: AccomplishmentUpdateFormInputValues) => AccomplishmentUpdateFormInputValues;
    onSuccess?: (fields: AccomplishmentUpdateFormInputValues) => void;
    onError?: (fields: AccomplishmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AccomplishmentUpdateFormInputValues) => AccomplishmentUpdateFormInputValues;
    onValidate?: AccomplishmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AccomplishmentUpdateForm(props: AccomplishmentUpdateFormProps): React.ReactElement;
