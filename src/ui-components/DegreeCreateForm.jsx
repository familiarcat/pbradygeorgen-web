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
import { Degree, School as School0, Education } from "../models";
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
export default function DegreeCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    educationID: undefined,
    School: undefined,
  };
  const [major, setMajor] = React.useState(initialValues.major);
  const [startYear, setStartYear] = React.useState(initialValues.startYear);
  const [endYear, setEndYear] = React.useState(initialValues.endYear);
  const [educationID, setEducationID] = React.useState(
    initialValues.educationID
  );
  const [School, setSchool] = React.useState(initialValues.School);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMajor(initialValues.major);
    setStartYear(initialValues.startYear);
    setEndYear(initialValues.endYear);
    setEducationID(initialValues.educationID);
    setCurrentEducationIDValue(undefined);
    setCurrentEducationIDDisplayValue("");
    setSchool(initialValues.School);
    setCurrentSchoolValue(undefined);
    setCurrentSchoolDisplayValue("");
    setErrors({});
  };
  const [currentEducationIDDisplayValue, setCurrentEducationIDDisplayValue] =
    React.useState("");
  const [currentEducationIDValue, setCurrentEducationIDValue] =
    React.useState(undefined);
  const educationIDRef = React.createRef();
  const [currentSchoolDisplayValue, setCurrentSchoolDisplayValue] =
    React.useState("");
  const [currentSchoolValue, setCurrentSchoolValue] = React.useState(undefined);
  const SchoolRef = React.createRef();
  const getIDValue = {
    School: (r) => JSON.stringify({ id: r?.id }),
  };
  const SchoolIdSet = new Set(
    Array.isArray(School)
      ? School.map((r) => getIDValue.School?.(r))
      : getIDValue.School?.(School)
  );
  const educationRecords = useDataStoreBinding({
    type: "collection",
    model: Education,
  }).items;
  const schoolRecords = useDataStoreBinding({
    type: "collection",
    model: School0,
  }).items;
  const getDisplayValue = {
    educationID: (r) => `${r?.summary ? r?.summary + " - " : ""}${r?.id}`,
    School: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    major: [],
    startYear: [],
    endYear: [],
    educationID: [{ type: "Required" }],
    School: [],
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
          educationID,
          School,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          await DataStore.save(new Degree(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "DegreeCreateForm")}
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
              educationID,
              School,
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
              educationID,
              School,
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
              educationID,
              School,
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
              educationID: value,
              School,
            };
            const result = onChange(modelFields);
            value = result?.educationID ?? value;
          }
          setEducationID(value);
          setCurrentEducationIDValue(undefined);
        }}
        currentFieldValue={currentEducationIDValue}
        label={"Education id"}
        items={educationID ? [educationID] : []}
        hasError={errors?.educationID?.hasError}
        errorMessage={errors?.educationID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.educationID(
            educationRecords.find((r) => r.id === value)
          )
        }
        setFieldValue={(value) => {
          setCurrentEducationIDDisplayValue(
            getDisplayValue.educationID(
              educationRecords.find((r) => r.id === value)
            )
          );
          setCurrentEducationIDValue(value);
        }}
        inputFieldRef={educationIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Education id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Education"
          value={currentEducationIDDisplayValue}
          options={educationRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.educationID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEducationIDValue(id);
            setCurrentEducationIDDisplayValue(label);
            runValidationTasks("educationID", label);
          }}
          onClear={() => {
            setCurrentEducationIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.educationID?.hasError) {
              runValidationTasks("educationID", value);
            }
            setCurrentEducationIDDisplayValue(value);
            setCurrentEducationIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("educationID", currentEducationIDValue)
          }
          errorMessage={errors.educationID?.errorMessage}
          hasError={errors.educationID?.hasError}
          ref={educationIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "educationID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              major,
              startYear,
              endYear,
              educationID,
              School: value,
            };
            const result = onChange(modelFields);
            value = result?.School ?? value;
          }
          setSchool(value);
          setCurrentSchoolValue(undefined);
          setCurrentSchoolDisplayValue("");
        }}
        currentFieldValue={currentSchoolValue}
        label={"School"}
        items={School ? [School] : []}
        hasError={errors?.School?.hasError}
        errorMessage={errors?.School?.errorMessage}
        getBadgeText={getDisplayValue.School}
        setFieldValue={(model) => {
          setCurrentSchoolDisplayValue(getDisplayValue.School(model));
          setCurrentSchoolValue(model);
        }}
        inputFieldRef={SchoolRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="School"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search School"
          value={currentSchoolDisplayValue}
          options={schoolRecords
            .filter((r) => !SchoolIdSet.has(getIDValue.School?.(r)))
            .map((r) => ({
              id: getIDValue.School?.(r),
              label: getDisplayValue.School?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentSchoolValue(
              schoolRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSchoolDisplayValue(label);
            runValidationTasks("School", label);
          }}
          onClear={() => {
            setCurrentSchoolDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.School?.hasError) {
              runValidationTasks("School", value);
            }
            setCurrentSchoolDisplayValue(value);
            setCurrentSchoolValue(undefined);
          }}
          onBlur={() => runValidationTasks("School", currentSchoolDisplayValue)}
          errorMessage={errors.School?.errorMessage}
          hasError={errors.School?.hasError}
          ref={SchoolRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "School")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
