/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Summary } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SummaryUpdateForm(props) {
  const {
    id: idProp,
    summary: summaryModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    goals: "",
    persona: "",
  };
  const [goals, setGoals] = React.useState(initialValues.goals);
  const [persona, setPersona] = React.useState(initialValues.persona);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = summaryRecord
      ? { ...initialValues, ...summaryRecord }
      : initialValues;
    setGoals(cleanValues.goals);
    setPersona(cleanValues.persona);
    setErrors({});
  };
  const [summaryRecord, setSummaryRecord] = React.useState(summaryModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Summary, idProp)
        : summaryModelProp;
      setSummaryRecord(record);
    };
    queryData();
  }, [idProp, summaryModelProp]);
  React.useEffect(resetStateValues, [summaryRecord]);
  const validations = {
    goals: [],
    persona: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          goals,
          persona,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Summary.copyOf(summaryRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SummaryUpdateForm")}
      {...rest}
    >
      <TextField
        label="Goals"
        isRequired={false}
        isReadOnly={false}
        value={goals}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              goals: value,
              persona,
            };
            const result = onChange(modelFields);
            value = result?.goals ?? value;
          }
          if (errors.goals?.hasError) {
            runValidationTasks("goals", value);
          }
          setGoals(value);
        }}
        onBlur={() => runValidationTasks("goals", goals)}
        errorMessage={errors.goals?.errorMessage}
        hasError={errors.goals?.hasError}
        {...getOverrideProps(overrides, "goals")}
      ></TextField>
      <TextField
        label="Persona"
        isRequired={false}
        isReadOnly={false}
        value={persona}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              goals,
              persona: value,
            };
            const result = onChange(modelFields);
            value = result?.persona ?? value;
          }
          if (errors.persona?.hasError) {
            runValidationTasks("persona", value);
          }
          setPersona(value);
        }}
        onBlur={() => runValidationTasks("persona", persona)}
        errorMessage={errors.persona?.errorMessage}
        hasError={errors.persona?.hasError}
        {...getOverrideProps(overrides, "persona")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || summaryModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || summaryModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
