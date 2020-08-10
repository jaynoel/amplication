import React, { useMemo } from "react";
import { Formik, Form } from "formik";

import omitDeep from "deepdash-es/omitDeep";

import * as types from "../types";
import { TextField } from "../Components/TextField";
import EditableTitleField from "../Components/EditableTitleField";
import NameField from "../Components/NameField";

type EntityInput = Omit<types.Entity, "fields" | "versionNumber">;

type Props = {
  entity?: types.Entity;
  onSubmit: (entity: EntityInput) => void;
  applicationId: string;
};

const NON_INPUT_GRAPHQL_PROPERTIES = [
  "createdAt",
  "updatedAt",
  "versionNumber",
  "__typename",
];

const EntityForm = ({ entity, onSubmit, applicationId }: Props) => {
  const initialValues = useMemo(() => {
    const sanitizedDefaultValues = omitDeep(
      {
        ...entity,
      },
      NON_INPUT_GRAPHQL_PROPERTIES
    );
    return sanitizedDefaultValues as EntityInput;
  }, [entity]);

  return (
    <div className="entity-form">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <>
              <Form>
                <>
                  <div className="form__header">
                    <EditableTitleField
                      name="displayName"
                      label="Display Name"
                    />
                    <EditableTitleField
                      secondary
                      name="description"
                      label="Description"
                    />
                  </div>
                  <div className="form__body">
                    <div className="form__body__general">
                      <h2>General</h2>
                      <NameField name="name" />
                      <TextField
                        name="pluralDisplayName"
                        label="Plural Display Name"
                      />
                    </div>
                    <div className="form__body__permissions">Permission</div>
                  </div>
                </>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default EntityForm;