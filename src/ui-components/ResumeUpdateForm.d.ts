/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Resume, Summary as Summary0, Skill } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ResumeUpdateFormInputValues = {
    name?: string;
    address?: string;
    phone?: string;
    url?: string;
    image?: string;
    Summary?: Summary0;
    Skills?: Skill[];
    email?: string;
};
export declare type ResumeUpdateFormValidationValues = {
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
export declare type ResumeUpdateFormOverridesProps = {
    ResumeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    Summary?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ResumeUpdateFormProps = React.PropsWithChildren<{
    overrides?: ResumeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    resume?: Resume;
    onSubmit?: (fields: ResumeUpdateFormInputValues) => ResumeUpdateFormInputValues;
    onSuccess?: (fields: ResumeUpdateFormInputValues) => void;
    onError?: (fields: ResumeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResumeUpdateFormInputValues) => ResumeUpdateFormInputValues;
    onValidate?: ResumeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ResumeUpdateForm(props: ResumeUpdateFormProps): React.ReactElement;
