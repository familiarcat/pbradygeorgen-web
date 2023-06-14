/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Degree } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EducationCreateFormInputValues = {
    summary?: string;
    Degrees?: Degree[];
};
export declare type EducationCreateFormValidationValues = {
    summary?: ValidationFunction<string>;
    Degrees?: ValidationFunction<Degree>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EducationCreateFormOverridesProps = {
    EducationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    summary?: PrimitiveOverrideProps<TextFieldProps>;
    Degrees?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EducationCreateFormProps = React.PropsWithChildren<{
    overrides?: EducationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EducationCreateFormInputValues) => EducationCreateFormInputValues;
    onSuccess?: (fields: EducationCreateFormInputValues) => void;
    onError?: (fields: EducationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EducationCreateFormInputValues) => EducationCreateFormInputValues;
    onValidate?: EducationCreateFormValidationValues;
} & React.CSSProperties>;
export default function EducationCreateForm(props: EducationCreateFormProps): React.ReactElement;
