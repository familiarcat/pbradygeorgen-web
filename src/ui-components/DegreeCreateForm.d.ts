/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { School as School0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DegreeCreateFormInputValues = {
    major?: string;
    startYear?: string;
    endYear?: string;
    educationID?: string;
    School?: School0;
};
export declare type DegreeCreateFormValidationValues = {
    major?: ValidationFunction<string>;
    startYear?: ValidationFunction<string>;
    endYear?: ValidationFunction<string>;
    educationID?: ValidationFunction<string>;
    School?: ValidationFunction<School0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DegreeCreateFormOverridesProps = {
    DegreeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    major?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    educationID?: PrimitiveOverrideProps<AutocompleteProps>;
    School?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type DegreeCreateFormProps = React.PropsWithChildren<{
    overrides?: DegreeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DegreeCreateFormInputValues) => DegreeCreateFormInputValues;
    onSuccess?: (fields: DegreeCreateFormInputValues) => void;
    onError?: (fields: DegreeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DegreeCreateFormInputValues) => DegreeCreateFormInputValues;
    onValidate?: DegreeCreateFormValidationValues;
} & React.CSSProperties>;
export default function DegreeCreateForm(props: DegreeCreateFormProps): React.ReactElement;
