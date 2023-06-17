/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Summary } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SummaryUpdateFormInputValues = {
    goals?: string;
    persona?: string;
};
export declare type SummaryUpdateFormValidationValues = {
    goals?: ValidationFunction<string>;
    persona?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SummaryUpdateFormOverridesProps = {
    SummaryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    goals?: PrimitiveOverrideProps<TextFieldProps>;
    persona?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SummaryUpdateFormProps = React.PropsWithChildren<{
    overrides?: SummaryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    summary?: Summary;
    onSubmit?: (fields: SummaryUpdateFormInputValues) => SummaryUpdateFormInputValues;
    onSuccess?: (fields: SummaryUpdateFormInputValues) => void;
    onError?: (fields: SummaryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SummaryUpdateFormInputValues) => SummaryUpdateFormInputValues;
    onValidate?: SummaryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SummaryUpdateForm(props: SummaryUpdateFormProps): React.ReactElement;
