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
import { Company, Engagement, Accomplishment, Experience } from "../models";
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
export default function CompanyUpdateForm(props) {
  const {
    id: idProp,
    company: companyModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    role: "",
    startDate: "",
    endDate: "",
    historyID: undefined,
    Engagements: [],
    Accomplishments: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [role, setRole] = React.useState(initialValues.role);
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [historyID, setHistoryID] = React.useState(initialValues.historyID);
  const [Engagements, setEngagements] = React.useState(
    initialValues.Engagements
  );
  const [Accomplishments, setAccomplishments] = React.useState(
    initialValues.Accomplishments
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = companyRecord
      ? {
          ...initialValues,
          ...companyRecord,
          historyID,
          Engagements: linkedEngagements,
          Accomplishments: linkedAccomplishments,
        }
      : initialValues;
    setTitle(cleanValues.title);
    setRole(cleanValues.role);
    setStartDate(cleanValues.startDate);
    setEndDate(cleanValues.endDate);
    setHistoryID(cleanValues.historyID);
    setCurrentHistoryIDValue(undefined);
    setCurrentHistoryIDDisplayValue("");
    setEngagements(cleanValues.Engagements ?? []);
    setCurrentEngagementsValue(undefined);
    setCurrentEngagementsDisplayValue("");
    setAccomplishments(cleanValues.Accomplishments ?? []);
    setCurrentAccomplishmentsValue(undefined);
    setCurrentAccomplishmentsDisplayValue("");
    setErrors({});
  };
  const [companyRecord, setCompanyRecord] = React.useState(companyModelProp);
  const [linkedEngagements, setLinkedEngagements] = React.useState([]);
  const canUnlinkEngagements = false;
  const [linkedAccomplishments, setLinkedAccomplishments] = React.useState([]);
  const canUnlinkAccomplishments = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Company, idProp)
        : companyModelProp;
      setCompanyRecord(record);
      const historyIDRecord = record ? await record.historyID : undefined;
      setHistoryID(historyIDRecord);
      const linkedEngagements = record
        ? await record.Engagements.toArray()
        : [];
      setLinkedEngagements(linkedEngagements);
      const linkedAccomplishments = record
        ? await record.Accomplishments.toArray()
        : [];
      setLinkedAccomplishments(linkedAccomplishments);
    };
    queryData();
  }, [idProp, companyModelProp]);
  React.useEffect(resetStateValues, [
    companyRecord,
    historyID,
    linkedEngagements,
    linkedAccomplishments,
  ]);
  const [currentHistoryIDDisplayValue, setCurrentHistoryIDDisplayValue] =
    React.useState("");
  const [currentHistoryIDValue, setCurrentHistoryIDValue] =
    React.useState(undefined);
  const historyIDRef = React.createRef();
  const [currentEngagementsDisplayValue, setCurrentEngagementsDisplayValue] =
    React.useState("");
  const [currentEngagementsValue, setCurrentEngagementsValue] =
    React.useState(undefined);
  const EngagementsRef = React.createRef();
  const [
    currentAccomplishmentsDisplayValue,
    setCurrentAccomplishmentsDisplayValue,
  ] = React.useState("");
  const [currentAccomplishmentsValue, setCurrentAccomplishmentsValue] =
    React.useState(undefined);
  const AccomplishmentsRef = React.createRef();
  const getIDValue = {
    Engagements: (r) => JSON.stringify({ id: r?.id }),
    Accomplishments: (r) => JSON.stringify({ id: r?.id }),
  };
  const EngagementsIdSet = new Set(
    Array.isArray(Engagements)
      ? Engagements.map((r) => getIDValue.Engagements?.(r))
      : getIDValue.Engagements?.(Engagements)
  );
  const AccomplishmentsIdSet = new Set(
    Array.isArray(Accomplishments)
      ? Accomplishments.map((r) => getIDValue.Accomplishments?.(r))
      : getIDValue.Accomplishments?.(Accomplishments)
  );
  const experienceRecords = useDataStoreBinding({
    type: "collection",
    model: Experience,
  }).items;
  const engagementRecords = useDataStoreBinding({
    type: "collection",
    model: Engagement,
  }).items;
  const accomplishmentRecords = useDataStoreBinding({
    type: "collection",
    model: Accomplishment,
  }).items;
  const getDisplayValue = {
    historyID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    Engagements: (r) => `${r?.client ? r?.client + " - " : ""}${r?.id}`,
    Accomplishments: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [],
    role: [],
    startDate: [],
    endDate: [],
    historyID: [{ type: "Required" }],
    Engagements: [],
    Accomplishments: [],
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
          title,
          role,
          startDate,
          endDate,
          historyID,
          Engagements,
          Accomplishments,
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
          const engagementsToLink = [];
          const engagementsToUnLink = [];
          const engagementsSet = new Set();
          const linkedEngagementsSet = new Set();
          Engagements.forEach((r) =>
            engagementsSet.add(getIDValue.Engagements?.(r))
          );
          linkedEngagements.forEach((r) =>
            linkedEngagementsSet.add(getIDValue.Engagements?.(r))
          );
          linkedEngagements.forEach((r) => {
            if (!engagementsSet.has(getIDValue.Engagements?.(r))) {
              engagementsToUnLink.push(r);
            }
          });
          Engagements.forEach((r) => {
            if (!linkedEngagementsSet.has(getIDValue.Engagements?.(r))) {
              engagementsToLink.push(r);
            }
          });
          engagementsToUnLink.forEach((original) => {
            if (!canUnlinkEngagements) {
              throw Error(
                `Engagement ${original.id} cannot be unlinked from Company because companyID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Engagement.copyOf(original, (updated) => {
                  updated.companyID = null;
                })
              )
            );
          });
          engagementsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Engagement.copyOf(original, (updated) => {
                  updated.companyID = companyRecord.id;
                })
              )
            );
          });
          const accomplishmentsToLink = [];
          const accomplishmentsToUnLink = [];
          const accomplishmentsSet = new Set();
          const linkedAccomplishmentsSet = new Set();
          Accomplishments.forEach((r) =>
            accomplishmentsSet.add(getIDValue.Accomplishments?.(r))
          );
          linkedAccomplishments.forEach((r) =>
            linkedAccomplishmentsSet.add(getIDValue.Accomplishments?.(r))
          );
          linkedAccomplishments.forEach((r) => {
            if (!accomplishmentsSet.has(getIDValue.Accomplishments?.(r))) {
              accomplishmentsToUnLink.push(r);
            }
          });
          Accomplishments.forEach((r) => {
            if (
              !linkedAccomplishmentsSet.has(getIDValue.Accomplishments?.(r))
            ) {
              accomplishmentsToLink.push(r);
            }
          });
          accomplishmentsToUnLink.forEach((original) => {
            if (!canUnlinkAccomplishments) {
              throw Error(
                `Accomplishment ${original.id} cannot be unlinked from Company because companyID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Accomplishment.copyOf(original, (updated) => {
                  updated.companyID = null;
                })
              )
            );
          });
          accomplishmentsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Accomplishment.copyOf(original, (updated) => {
                  updated.companyID = companyRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            title: modelFields.title,
            role: modelFields.role,
            startDate: modelFields.startDate,
            endDate: modelFields.endDate,
            historyID: modelFields.historyID,
          };
          promises.push(
            DataStore.save(
              Company.copyOf(companyRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CompanyUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              role,
              startDate,
              endDate,
              historyID,
              Engagements,
              Accomplishments,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              role: value,
              startDate,
              endDate,
              historyID,
              Engagements,
              Accomplishments,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
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
              title,
              role,
              startDate: value,
              endDate,
              historyID,
              Engagements,
              Accomplishments,
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
              title,
              role,
              startDate,
              endDate: value,
              historyID,
              Engagements,
              Accomplishments,
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
              title,
              role,
              startDate,
              endDate,
              historyID: value,
              Engagements,
              Accomplishments,
            };
            const result = onChange(modelFields);
            value = result?.historyID ?? value;
          }
          setHistoryID(value);
          setCurrentHistoryIDValue(undefined);
        }}
        currentFieldValue={currentHistoryIDValue}
        label={"History id"}
        items={historyID ? [historyID] : []}
        hasError={errors?.historyID?.hasError}
        errorMessage={errors?.historyID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.historyID(
            experienceRecords.find((r) => r.id === value)
          )
        }
        setFieldValue={(value) => {
          setCurrentHistoryIDDisplayValue(
            getDisplayValue.historyID(
              experienceRecords.find((r) => r.id === value)
            )
          );
          setCurrentHistoryIDValue(value);
        }}
        inputFieldRef={historyIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="History id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Experience"
          value={currentHistoryIDDisplayValue}
          options={experienceRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.historyID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentHistoryIDValue(id);
            setCurrentHistoryIDDisplayValue(label);
            runValidationTasks("historyID", label);
          }}
          onClear={() => {
            setCurrentHistoryIDDisplayValue("");
          }}
          defaultValue={historyID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.historyID?.hasError) {
              runValidationTasks("historyID", value);
            }
            setCurrentHistoryIDDisplayValue(value);
            setCurrentHistoryIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("historyID", currentHistoryIDValue)}
          errorMessage={errors.historyID?.errorMessage}
          hasError={errors.historyID?.hasError}
          ref={historyIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "historyID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              role,
              startDate,
              endDate,
              historyID,
              Engagements: values,
              Accomplishments,
            };
            const result = onChange(modelFields);
            values = result?.Engagements ?? values;
          }
          setEngagements(values);
          setCurrentEngagementsValue(undefined);
          setCurrentEngagementsDisplayValue("");
        }}
        currentFieldValue={currentEngagementsValue}
        label={"Engagements"}
        items={Engagements}
        hasError={errors?.Engagements?.hasError}
        errorMessage={errors?.Engagements?.errorMessage}
        getBadgeText={getDisplayValue.Engagements}
        setFieldValue={(model) => {
          setCurrentEngagementsDisplayValue(getDisplayValue.Engagements(model));
          setCurrentEngagementsValue(model);
        }}
        inputFieldRef={EngagementsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Engagements"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Engagement"
          value={currentEngagementsDisplayValue}
          options={engagementRecords
            .filter((r) => !EngagementsIdSet.has(getIDValue.Engagements?.(r)))
            .map((r) => ({
              id: getIDValue.Engagements?.(r),
              label: getDisplayValue.Engagements?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEngagementsValue(
              engagementRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEngagementsDisplayValue(label);
            runValidationTasks("Engagements", label);
          }}
          onClear={() => {
            setCurrentEngagementsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Engagements?.hasError) {
              runValidationTasks("Engagements", value);
            }
            setCurrentEngagementsDisplayValue(value);
            setCurrentEngagementsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Engagements", currentEngagementsDisplayValue)
          }
          errorMessage={errors.Engagements?.errorMessage}
          hasError={errors.Engagements?.hasError}
          ref={EngagementsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Engagements")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              role,
              startDate,
              endDate,
              historyID,
              Engagements,
              Accomplishments: values,
            };
            const result = onChange(modelFields);
            values = result?.Accomplishments ?? values;
          }
          setAccomplishments(values);
          setCurrentAccomplishmentsValue(undefined);
          setCurrentAccomplishmentsDisplayValue("");
        }}
        currentFieldValue={currentAccomplishmentsValue}
        label={"Accomplishments"}
        items={Accomplishments}
        hasError={errors?.Accomplishments?.hasError}
        errorMessage={errors?.Accomplishments?.errorMessage}
        getBadgeText={getDisplayValue.Accomplishments}
        setFieldValue={(model) => {
          setCurrentAccomplishmentsDisplayValue(
            getDisplayValue.Accomplishments(model)
          );
          setCurrentAccomplishmentsValue(model);
        }}
        inputFieldRef={AccomplishmentsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Accomplishments"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Accomplishment"
          value={currentAccomplishmentsDisplayValue}
          options={accomplishmentRecords
            .filter(
              (r) => !AccomplishmentsIdSet.has(getIDValue.Accomplishments?.(r))
            )
            .map((r) => ({
              id: getIDValue.Accomplishments?.(r),
              label: getDisplayValue.Accomplishments?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentAccomplishmentsValue(
              accomplishmentRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentAccomplishmentsDisplayValue(label);
            runValidationTasks("Accomplishments", label);
          }}
          onClear={() => {
            setCurrentAccomplishmentsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Accomplishments?.hasError) {
              runValidationTasks("Accomplishments", value);
            }
            setCurrentAccomplishmentsDisplayValue(value);
            setCurrentAccomplishmentsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "Accomplishments",
              currentAccomplishmentsDisplayValue
            )
          }
          errorMessage={errors.Accomplishments?.errorMessage}
          hasError={errors.Accomplishments?.hasError}
          ref={AccomplishmentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Accomplishments")}
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
          isDisabled={!(idProp || companyModelProp)}
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
              !(idProp || companyModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
