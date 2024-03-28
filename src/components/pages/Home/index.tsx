import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Text } from '@components/atoms/Text';
import { ControlledInput } from '@components/atoms/ControlledInput';
import { Button } from '@components/atoms/Button';
import { useCreatePatientMutation } from '@services/patient';
import { Toast } from '@components/atoms/Toast';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type HomeProps = DefaultPageProps & {
  className?: string;
};
interface Form1FormData {
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
}
function HomePage(props: HomeProps): JSX.Element {
  const formForm1 = useForm1();
  const { t } = useTranslation('web');
  const { errors: formForm1Error } = formForm1.formState;
  const createPatientMutation = useCreatePatientMutation();

  const handleForm1Button = async (values: Form1FormData) => {
    try {
      await createPatientMutation.mutateAsync({
        patients: {
          first_name: values.first_name,
          mobile_number: values.mobile_number,
          last_name: values.last_name,
          email: values.email,
        },
      });
      Toast.success(`Successful`);
    } catch (error: unknown) {
      Toast.error(`Failed`);
    }
  };
  return (
    <div className={styles.page_container}>
      <form className={styles.form_1}>
        <Text textType="Text" className={styles.form_1_name}>
          {t('screen.home.form_1_name')}
        </Text>
        <div className={styles.input_1_container}>
          <div className={styles.input_1_inner}>
            <Text textType="Text" className={styles.input_1_label}>
              {t('screen.home.input_1_label')}
            </Text>
            <Text textType="Text" className={styles.input_1_required}>{`*`}</Text>
          </div>
          <ControlledInput
            placeholder={t('screen.home.first_name')}
            className={styles.first_name}
            control={formForm1.control}
            formField="first_name"
          />
          <div className={styles.input_1_error_message_container}>
            {formForm1Error.first_name?.message ? (
              <Text textType="Text" className={styles.input_1_required}>
                {formForm1Error.first_name?.message}
              </Text>
            ) : undefined}
          </div>
        </div>
        <div className={styles.input_1_container}>
          <div className={styles.input_1_inner}>
            <Text textType="Text" className={styles.input_1_label}>
              {t('screen.home.input_2_label')}
            </Text>
            <Text textType="Text" className={styles.input_1_required}>{`*`}</Text>
          </div>
          <ControlledInput
            placeholder={t('screen.home.last_name')}
            className={styles.first_name}
            control={formForm1.control}
            formField="last_name"
          />
          <div className={styles.input_1_error_message_container}>
            {formForm1Error.last_name?.message ? (
              <Text textType="Text" className={styles.input_1_required}>
                {formForm1Error.last_name?.message}
              </Text>
            ) : undefined}
          </div>
        </div>
        <div className={styles.input_1_container}>
          <div className={styles.input_1_inner}>
            <Text textType="Text" className={styles.input_1_label}>
              {t('screen.home.input_3_label')}
            </Text>
            <Text textType="Text" className={styles.input_1_required}>{`*`}</Text>
          </div>
          <ControlledInput
            placeholder={t('screen.home.mobile_number')}
            className={styles.first_name}
            control={formForm1.control}
            formField="mobile_number"
          />
          <div className={styles.input_1_error_message_container}>
            {formForm1Error.mobile_number?.message ? (
              <Text textType="Text" className={styles.input_1_required}>
                {formForm1Error.mobile_number?.message}
              </Text>
            ) : undefined}
          </div>
        </div>
        <div className={styles.input_1_container}>
          <div className={styles.input_1_inner}>
            <Text textType="Text" className={styles.input_1_label}>
              {t('screen.home.input_4_label')}
            </Text>
          </div>
          <ControlledInput
            placeholder={t('screen.home.email')}
            className={styles.first_name}
            control={formForm1.control}
            formField="email"
          />
          <div className={styles.input_1_error_message_container}>
            {formForm1Error.email?.message ? (
              <Text textType="Text" className={styles.input_1_required}>
                {formForm1Error.email?.message}
              </Text>
            ) : undefined}
          </div>
        </div>
        <Button
          onClick={formForm1.handleSubmit(handleForm1Button)}
          buttonType="primary"
          type="button"
          className={styles.form_1_button}
          disabled={createPatientMutation.isLoading}
        >
          <Text textType="Text" className={styles.form_1_text_0}>
            {t('screen.home.form_1_text_0')}
          </Text>
        </Button>
      </form>
    </div>
  );
}

const useForm1 = () => {
  const validationScheme = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().notRequired(),
        last_name: yup.string().notRequired(),
        mobile_number: yup.string().notRequired(),
        email: yup.string().email(),
      }),
    [],
  );
  return useForm<Form1FormData>({
    resolver: yupResolver(validationScheme),
    shouldFocusError: true,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
};
export default HomePage;
