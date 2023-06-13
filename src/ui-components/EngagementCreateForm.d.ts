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
export declare type EngagementCreateFormInputValues = {
    client?: string;
    startDate?: string;
    endDate?: string;
    companyID?: string;
    Skills?: Skill[];
};
export declare type EngagementCreateFormValidationValues = {
    client?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    companyID?: ValidationFunction<string>;
    Skills?: ValidationFunction<Skill>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EngagementCreateFormOverridesProps = {
    EngagementCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    client?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    companyID?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EngagementCreateFormProps = React.PropsWithChildren<{
    overrides?: EngagementCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EngagementCreateFormInputValues) => EngagementCreateFormInputValues;
    onSuccess?: (fields: EngagementCreateFormInputValues) => void;
    onError?: (fields: EngagementCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EngagementCreateFormInputValues) => EngagementCreateFormInputValues;
    onValidate?: EngagementCreateFormValidationValues;
} & React.CSSProperties>;
export default function EngagementCreateForm(props: EngagementCreateFormProps): React.ReactElement;
