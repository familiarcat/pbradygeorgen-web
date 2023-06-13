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
import { Engagement, Skill, Company } from "../models";
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
export default function EngagementUpdateForm(props) {
  const {
    id: idProp,
    engagement: engagementModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    client: "",
    startDate: "",
    endDate: "",
    companyID: undefined,
    Skills: [],
  };
  const [client, setClient] = React.useState(initialValues.client);
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [companyID, setCompanyID] = React.useState(initialValues.companyID);
  const [Skills, setSkills] = React.useState(initialValues.Skills);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = engagementRecord
      ? {
          ...initialValues,
          ...engagementRecord,
          companyID,
          Skills: linkedSkills,
        }
      : initialValues;
    setClient(cleanValues.client);
    setStartDate(cleanValues.startDate);
    setEndDate(cleanValues.endDate);
    setCompanyID(cleanValues.companyID);
    setCurrentCompanyIDValue(undefined);
    setCurrentCompanyIDDisplayValue("");
    setSkills(cleanValues.Skills ?? []);
    setCurrentSkillsValue(undefined);
    setCurrentSkillsDisplayValue("");
    setErrors({});
  };
  const [engagementRecord, setEngagementRecord] =
    React.useState(engagementModelProp);
  const [linkedSkills, setLinkedSkills] = React.useState([]);
  const canUnlinkSkills = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Engagement, idProp)
        : engagementModelProp;
      setEngagementRecord(record);
      const companyIDRecord = record ? await record.companyID : undefined;
      setCompanyID(companyIDRecord);
      const linkedSkills = record ? await record.Skills.toArray() : [];
      setLinkedSkills(linkedSkills);
    };
    queryData();
  }, [idProp, engagementModelProp]);
  React.useEffect(resetStateValues, [
    engagementRecord,
    companyID,
    linkedSkills,
  ]);
  const [currentCompanyIDDisplayValue, setCurrentCompanyIDDisplayValue] =
    React.useState("");
  const [currentCompanyIDValue, setCurrentCompanyIDValue] =
    React.useState(undefined);
  const companyIDRef = React.createRef();
  const [currentSkillsDisplayValue, setCurrentSkillsDisplayValue] =
    React.useState("");
  const [currentSkillsValue, setCurrentSkillsValue] = React.useState(undefined);
  const SkillsRef = React.createRef();
  const getIDValue = {
    Skills: (r) => JSON.stringify({ id: r?.id }),
  };
  const SkillsIdSet = new Set(
    Array.isArray(Skills)
      ? Skills.map((r) => getIDValue.Skills?.(r))
      : getIDValue.Skills?.(Skills)
  );
  const companyRecords = useDataStoreBinding({
    type: "collection",
    model: Company,
  }).items;
  const skillRecords = useDataStoreBinding({
    type: "collection",
    model: Skill,
  }).items;
  const getDisplayValue = {
    companyID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    Skills: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    client: [],
    startDate: [],
    endDate: [],
    companyID: [{ type: "Required" }],
    Skills: [],
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
          client,
          startDate,
          endDate,
          companyID,
          Skills,
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
          const skillsToLink = [];
          const skillsToUnLink = [];
          const skillsSet = new Set();
          const linkedSkillsSet = new Set();
          Skills.forEach((r) => skillsSet.add(getIDValue.Skills?.(r)));
          linkedSkills.forEach((r) =>
            linkedSkillsSet.add(getIDValue.Skills?.(r))
          );
          linkedSkills.forEach((r) => {
            if (!skillsSet.has(getIDValue.Skills?.(r))) {
              skillsToUnLink.push(r);
            }
          });
          Skills.forEach((r) => {
            if (!linkedSkillsSet.has(getIDValue.Skills?.(r))) {
              skillsToLink.push(r);
            }
          });
          skillsToUnLink.forEach((original) => {
            if (!canUnlinkSkills) {
              throw Error(
                `Skill ${original.id} cannot be unlinked from Engagement because engagementID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Skill.copyOf(original, (updated) => {
                  updated.engagementID = null;
                })
              )
            );
          });
          skillsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Skill.copyOf(original, (updated) => {
                  updated.engagementID = engagementRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            client: modelFields.client,
            startDate: modelFields.startDate,
            endDate: modelFields.endDate,
            companyID: modelFields.companyID,
          };
          promises.push(
            DataStore.save(
              Engagement.copyOf(engagementRecord, (updated) => {
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
      {...getOverrideProps(overrides, "EngagementUpdateForm")}
      {...rest}
    >
      <TextField
        label="Client"
        isRequired={false}
        isReadOnly={false}
        value={client}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              client: value,
              startDate,
              endDate,
              companyID,
              Skills,
            };
            const result = onChange(modelFields);
            value = result?.client ?? value;
          }
          if (errors.client?.hasError) {
            runValidationTasks("client", value);
          }
          setClient(value);
        }}
        onBlur={() => runValidationTasks("client", client)}
        errorMessage={errors.client?.errorMessage}
        hasError={errors.client?.hasError}
        {...getOverrideProps(overrides, "client")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={startDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              client,
              startDate: value,
              endDate,
              companyID,
              Skills,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={endDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              client,
              startDate,
              endDate: value,
              companyID,
              Skills,
            };
            const result = onChange(modelFields);
            value = result?.endDate ?? value;
          }
          if (errors.endDate?.hasError) {
            runValidationTasks("endDate", value);
          }
          setEndDate(value);
        }}
        onBlur={() => runValidationTasks("endDate", endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, "endDate")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              client,
              startDate,
              endDate,
              companyID: value,
              Skills,
            };
            const result = onChange(modelFields);
            value = result?.companyID ?? value;
          }
          setCompanyID(value);
          setCurrentCompanyIDValue(undefined);
        }}
        currentFieldValue={currentCompanyIDValue}
        label={"Company id"}
        items={companyID ? [companyID] : []}
        hasError={errors?.companyID?.hasError}
        errorMessage={errors?.companyID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.companyID(companyRecords.find((r) => r.id === value))
        }
        setFieldValue={(value) => {
          setCurrentCompanyIDDisplayValue(
            getDisplayValue.companyID(
              companyRecords.find((r) => r.id === value)
            )
          );
          setCurrentCompanyIDValue(value);
        }}
        inputFieldRef={companyIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Company id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Company"
          value={currentCompanyIDDisplayValue}
          options={companyRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.companyID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCompanyIDValue(id);
            setCurrentCompanyIDDisplayValue(label);
            runValidationTasks("companyID", label);
          }}
          onClear={() => {
            setCurrentCompanyIDDisplayValue("");
          }}
          defaultValue={companyID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.companyID?.hasError) {
              runValidationTasks("companyID", value);
            }
            setCurrentCompanyIDDisplayValue(value);
            setCurrentCompanyIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("companyID", currentCompanyIDValue)}
          errorMessage={errors.companyID?.errorMessage}
          hasError={errors.companyID?.hasError}
          ref={companyIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "companyID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              client,
              startDate,
              endDate,
              companyID,
              Skills: values,
            };
            const result = onChange(modelFields);
            values = result?.Skills ?? values;
          }
          setSkills(values);
          setCurrentSkillsValue(undefined);
          setCurrentSkillsDisplayValue("");
        }}
        currentFieldValue={currentSkillsValue}
        label={"Skills"}
        items={Skills}
        hasError={errors?.Skills?.hasError}
        errorMessage={errors?.Skills?.errorMessage}
        getBadgeText={getDisplayValue.Skills}
        setFieldValue={(model) => {
          setCurrentSkillsDisplayValue(getDisplayValue.Skills(model));
          setCurrentSkillsValue(model);
        }}
        inputFieldRef={SkillsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Skills"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Skill"
          value={currentSkillsDisplayValue}
          options={skillRecords
            .filter((r) => !SkillsIdSet.has(getIDValue.Skills?.(r)))
            .map((r) => ({
              id: getIDValue.Skills?.(r),
              label: getDisplayValue.Skills?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentSkillsValue(
              skillRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSkillsDisplayValue(label);
            runValidationTasks("Skills", label);
          }}
          onClear={() => {
            setCurrentSkillsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Skills?.hasError) {
              runValidationTasks("Skills", value);
            }
            setCurrentSkillsDisplayValue(value);
            setCurrentSkillsValue(undefined);
          }}
          onBlur={() => runValidationTasks("Skills", currentSkillsDisplayValue)}
          errorMessage={errors.Skills?.errorMessage}
          hasError={errors.Skills?.hasError}
          ref={SkillsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Skills")}
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
          isDisabled={!(idProp || engagementModelProp)}
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
              !(idProp || engagementModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
