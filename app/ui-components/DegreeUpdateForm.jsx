/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Degree, School } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function DegreeUpdateForm(props) {
  const {
    id: idProp,
    degree: degreeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    major: "",
    startYear: "",
    endYear: "",
    schoolID: undefined,
  };
  const [major, setMajor] = React.useState(initialValues.major);
  const [startYear, setStartYear] = React.useState(initialValues.startYear);
  const [endYear, setEndYear] = React.useState(initialValues.endYear);
  const [schoolID, setSchoolID] = React.useState(initialValues.schoolID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = degreeRecord
      ? { ...initialValues, ...degreeRecord, schoolID }
      : initialValues;
    setMajor(cleanValues.major);
    setStartYear(cleanValues.startYear);
    setEndYear(cleanValues.endYear);
    setSchoolID(cleanValues.schoolID);
    setCurrentSchoolIDValue(undefined);
    setCurrentSchoolIDDisplayValue("");
    setErrors({});
  };
  const [degreeRecord, setDegreeRecord] = React.useState(degreeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Degree, idProp)
        : degreeModelProp;
      setDegreeRecord(record);
      const schoolIDRecord = record ? await record.schoolID : undefined;
      setSchoolID(schoolIDRecord);
    };
    queryData();
  }, [idProp, degreeModelProp]);
  React.useEffect(resetStateValues, [degreeRecord, schoolID]);
  const [currentSchoolIDDisplayValue, setCurrentSchoolIDDisplayValue] =
    React.useState("");
  const [currentSchoolIDValue, setCurrentSchoolIDValue] =
    React.useState(undefined);
  const schoolIDRef = React.createRef();
  const schoolRecords = useDataStoreBinding({
    type: "collection",
    model: School,
  }).items;
  const getDisplayValue = {
    schoolID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    major: [],
    startYear: [],
    endYear: [],
    schoolID: [{ type: "Required" }],
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
          major,
          startYear,
          endYear,
          schoolID,
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
            Degree.copyOf(degreeRecord, (updated) => {
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
      {...getOverrideProps(overrides, "DegreeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Major"
        isRequired={false}
        isReadOnly={false}
        value={major}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              major: value,
              startYear,
              endYear,
              schoolID,
            };
            const result = onChange(modelFields);
            value = result?.major ?? value;
          }
          if (errors.major?.hasError) {
            runValidationTasks("major", value);
          }
          setMajor(value);
        }}
        onBlur={() => runValidationTasks("major", major)}
        errorMessage={errors.major?.errorMessage}
        hasError={errors.major?.hasError}
        {...getOverrideProps(overrides, "major")}
      ></TextField>
      <TextField
        label="Start year"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={startYear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              major,
              startYear: value,
              endYear,
              schoolID,
            };
            const result = onChange(modelFields);
            value = result?.startYear ?? value;
          }
          if (errors.startYear?.hasError) {
            runValidationTasks("startYear", value);
          }
          setStartYear(value);
        }}
        onBlur={() => runValidationTasks("startYear", startYear)}
        errorMessage={errors.startYear?.errorMessage}
        hasError={errors.startYear?.hasError}
        {...getOverrideProps(overrides, "startYear")}
      ></TextField>
      <TextField
        label="End year"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={endYear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              major,
              startYear,
              endYear: value,
              schoolID,
            };
            const result = onChange(modelFields);
            value = result?.endYear ?? value;
          }
          if (errors.endYear?.hasError) {
            runValidationTasks("endYear", value);
          }
          setEndYear(value);
        }}
        onBlur={() => runValidationTasks("endYear", endYear)}
        errorMessage={errors.endYear?.errorMessage}
        hasError={errors.endYear?.hasError}
        {...getOverrideProps(overrides, "endYear")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              major,
              startYear,
              endYear,
              schoolID: value,
            };
            const result = onChange(modelFields);
            value = result?.schoolID ?? value;
          }
          setSchoolID(value);
          setCurrentSchoolIDValue(undefined);
        }}
        currentFieldValue={currentSchoolIDValue}
        label={"School id"}
        items={schoolID ? [schoolID] : []}
        hasError={errors?.schoolID?.hasError}
        errorMessage={errors?.schoolID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.schoolID(schoolRecords.find((r) => r.id === value))
        }
        setFieldValue={(value) => {
          setCurrentSchoolIDDisplayValue(
            getDisplayValue.schoolID(schoolRecords.find((r) => r.id === value))
          );
          setCurrentSchoolIDValue(value);
        }}
        inputFieldRef={schoolIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="School id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search School"
          value={currentSchoolIDDisplayValue}
          options={schoolRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.schoolID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentSchoolIDValue(id);
            setCurrentSchoolIDDisplayValue(label);
            runValidationTasks("schoolID", label);
          }}
          onClear={() => {
            setCurrentSchoolIDDisplayValue("");
          }}
          defaultValue={schoolID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.schoolID?.hasError) {
              runValidationTasks("schoolID", value);
            }
            setCurrentSchoolIDDisplayValue(value);
            setCurrentSchoolIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("schoolID", currentSchoolIDValue)}
          errorMessage={errors.schoolID?.errorMessage}
          hasError={errors.schoolID?.hasError}
          ref={schoolIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "schoolID")}
        ></Autocomplete>
      </ArrayField>
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
          isDisabled={!(idProp || degreeModelProp)}
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
              !(idProp || degreeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
