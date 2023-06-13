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
import { School, Degree } from "../models";
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
export default function SchoolUpdateForm(props) {
  const {
    id: idProp,
    school: schoolModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    Degrees: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [Degrees, setDegrees] = React.useState(initialValues.Degrees);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = schoolRecord
      ? { ...initialValues, ...schoolRecord, Degrees: linkedDegrees }
      : initialValues;
    setName(cleanValues.name);
    setDegrees(cleanValues.Degrees ?? []);
    setCurrentDegreesValue(undefined);
    setCurrentDegreesDisplayValue("");
    setErrors({});
  };
  const [schoolRecord, setSchoolRecord] = React.useState(schoolModelProp);
  const [linkedDegrees, setLinkedDegrees] = React.useState([]);
  const canUnlinkDegrees = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(School, idProp)
        : schoolModelProp;
      setSchoolRecord(record);
      const linkedDegrees = record ? await record.Degrees.toArray() : [];
      setLinkedDegrees(linkedDegrees);
    };
    queryData();
  }, [idProp, schoolModelProp]);
  React.useEffect(resetStateValues, [schoolRecord, linkedDegrees]);
  const [currentDegreesDisplayValue, setCurrentDegreesDisplayValue] =
    React.useState("");
  const [currentDegreesValue, setCurrentDegreesValue] =
    React.useState(undefined);
  const DegreesRef = React.createRef();
  const getIDValue = {
    Degrees: (r) => JSON.stringify({ id: r?.id }),
  };
  const DegreesIdSet = new Set(
    Array.isArray(Degrees)
      ? Degrees.map((r) => getIDValue.Degrees?.(r))
      : getIDValue.Degrees?.(Degrees)
  );
  const degreeRecords = useDataStoreBinding({
    type: "collection",
    model: Degree,
  }).items;
  const getDisplayValue = {
    Degrees: (r) => `${r?.major ? r?.major + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    Degrees: [],
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
          name,
          Degrees,
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
          const promises = [];
          const degreesToLink = [];
          const degreesToUnLink = [];
          const degreesSet = new Set();
          const linkedDegreesSet = new Set();
          Degrees.forEach((r) => degreesSet.add(getIDValue.Degrees?.(r)));
          linkedDegrees.forEach((r) =>
            linkedDegreesSet.add(getIDValue.Degrees?.(r))
          );
          linkedDegrees.forEach((r) => {
            if (!degreesSet.has(getIDValue.Degrees?.(r))) {
              degreesToUnLink.push(r);
            }
          });
          Degrees.forEach((r) => {
            if (!linkedDegreesSet.has(getIDValue.Degrees?.(r))) {
              degreesToLink.push(r);
            }
          });
          degreesToUnLink.forEach((original) => {
            if (!canUnlinkDegrees) {
              throw Error(
                `Degree ${original.id} cannot be unlinked from School because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Degree.copyOf(original, (updated) => {
                  updated.School = null;
                })
              )
            );
          });
          degreesToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Degree.copyOf(original, (updated) => {
                  updated.School = schoolRecord;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
          };
          promises.push(
            DataStore.save(
              School.copyOf(schoolRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SchoolUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              Degrees,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              Degrees: values,
            };
            const result = onChange(modelFields);
            values = result?.Degrees ?? values;
          }
          setDegrees(values);
          setCurrentDegreesValue(undefined);
          setCurrentDegreesDisplayValue("");
        }}
        currentFieldValue={currentDegreesValue}
        label={"Degrees"}
        items={Degrees}
        hasError={errors?.Degrees?.hasError}
        errorMessage={errors?.Degrees?.errorMessage}
        getBadgeText={getDisplayValue.Degrees}
        setFieldValue={(model) => {
          setCurrentDegreesDisplayValue(getDisplayValue.Degrees(model));
          setCurrentDegreesValue(model);
        }}
        inputFieldRef={DegreesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Degrees"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Degree"
          value={currentDegreesDisplayValue}
          options={degreeRecords
            .filter((r) => !DegreesIdSet.has(getIDValue.Degrees?.(r)))
            .map((r) => ({
              id: getIDValue.Degrees?.(r),
              label: getDisplayValue.Degrees?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentDegreesValue(
              degreeRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentDegreesDisplayValue(label);
            runValidationTasks("Degrees", label);
          }}
          onClear={() => {
            setCurrentDegreesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Degrees?.hasError) {
              runValidationTasks("Degrees", value);
            }
            setCurrentDegreesDisplayValue(value);
            setCurrentDegreesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Degrees", currentDegreesDisplayValue)
          }
          errorMessage={errors.Degrees?.errorMessage}
          hasError={errors.Degrees?.hasError}
          ref={DegreesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Degrees")}
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
          isDisabled={!(idProp || schoolModelProp)}
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
              !(idProp || schoolModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
