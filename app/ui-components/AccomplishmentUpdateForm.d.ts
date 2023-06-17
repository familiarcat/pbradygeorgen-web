/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Accomplishment, Skill } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AccomplishmentUpdateFormInputValues = {
    title?: string;
    description?: string;
    link?: string;
    engagementID?: string;
    companyID?: string;
    Skills?: Skill[];
};
export declare type AccomplishmentUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    engagementID?: ValidationFunction<string>;
    companyID?: ValidationFunction<string>;
    Skills?: ValidationFunction<Skill>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccomplishmentUpdateFormOverridesProps = {
    AccomplishmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    engagementID?: PrimitiveOverrideProps<AutocompleteProps>;
    companyID?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
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
