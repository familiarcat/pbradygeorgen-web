/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Summary as Summary0, Skill } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ResumeCreateFormInputValues = {
    name?: string;
    address?: string;
    phone?: string;
    url?: string;
    image?: string;
    Summary?: Summary0;
    Skills?: Skill[];
    email?: string;
};
export declare type ResumeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    Summary?: ValidationFunction<Summary0>;
    Skills?: ValidationFunction<Skill>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResumeCreateFormOverridesProps = {
    ResumeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    Summary?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ResumeCreateFormProps = React.PropsWithChildren<{
    overrides?: ResumeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ResumeCreateFormInputValues) => ResumeCreateFormInputValues;
    onSuccess?: (fields: ResumeCreateFormInputValues) => void;
    onError?: (fields: ResumeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResumeCreateFormInputValues) => ResumeCreateFormInputValues;
    onValidate?: ResumeCreateFormValidationValues;
} & React.CSSProperties>;
export default function ResumeCreateForm(props: ResumeCreateFormProps): React.ReactElement;
