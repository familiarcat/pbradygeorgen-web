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
export declare type ResumeInputValues = {
    name?: string;
    phone?: string;
    email?: string;
    url?: string;
    image?: string;
    Summary?: Summary0;
    Skills?: Skill[];
    address?: string;
};
export declare type ResumeValidationValues = {
    name?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    Summary?: ValidationFunction<Summary0>;
    Skills?: ValidationFunction<Skill>;
    address?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResumeOverridesProps = {
    ResumeGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    Summary?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ResumeProps = React.PropsWithChildren<{
    overrides?: ResumeOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ResumeInputValues) => ResumeInputValues;
    onSuccess?: (fields: ResumeInputValues) => void;
    onError?: (fields: ResumeInputValues, errorMessage: string) => void;
    onChange?: (fields: ResumeInputValues) => ResumeInputValues;
    onValidate?: ResumeValidationValues;
} & React.CSSProperties>;
export default function Resume(props: ResumeProps): React.ReactElement;
