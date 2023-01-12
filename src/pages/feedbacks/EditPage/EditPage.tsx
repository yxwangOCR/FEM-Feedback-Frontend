import React from 'react';
import { useParams } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';

import Button from '@/components/Button';
import { useAuthContext } from '@/components/AppProviders';
import FormPage, { Cancell, FeedbackForm } from '@/pages/feedbacks/components/FormPage';
import { useGetFeedback, useUpdateFeedback } from '@/hooks/queries/feedbacks/feedbacks';

import './style.scss';

export const EditPage = () => {
  const { feedbackId = '' } = useParams();

  const {
    data: feedback,
    isLoading,
    isSuccess
  } = useGetFeedback(feedbackId);

  const { user } = useAuthContext();

  const isNotAuthor = (user?.id !== feedback?.author.id);

  const mutation = useUpdateFeedback();

  const handleSubmit = (data: FieldValues) => {
    mutation.mutateAsync({
      id: feedbackId,
      update: data as TFeedbackUpdate
    });
  };

  return (
    <FormPage type="edit">
      {isLoading && <p>loading...</p>}
      {isSuccess && (
        <FeedbackForm
          defaultValues={feedback}
          disabled={isNotAuthor}
          onSubmit={handleSubmit}
          type="edit"
        >
          <React.Fragment>
            <Cancell />
            <Button>Save Changes</Button>
          </React.Fragment>
        </FeedbackForm>)
      }
    </FormPage>
  );
};

export default EditPage;
