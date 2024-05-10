'use client';

import Btn from '@/components/UI/Btn/Btn';
import {Form, Input, Modal} from 'antd';
// import {useStore} from '../../store';
import {useMutation} from 'react-query';
// import {ConfirmEmail} from '../../api';
import {customNotification} from '@/src/helpers/customNotification';
import {useRouter} from 'next/navigation';
import {setCookie} from 'cookies-next';

export const ConfirmEmailModal = () => {
  const router = useRouter();

  // const {openConfirmCode, setOpenConfirmCode} = useStore();
  const {mutate: confirm, isLoading: isConfirmLoading} = useMutation(ConfirmEmail);

  const onConfirmFinish = (value) => {
    confirm(value, {
      onSuccess: (data) => {
        data.json().then((data) => {
          if (!data?.message) return;

          if (data?.message === 'Почта подтверждена') {
            setOpenConfirmCode(false);
          }

          if (data?.token) {
            router.push('/marketplace');
            setCookie('token', data?.token);
          }

          customNotification('info', 'top', 'Информация', data?.message);
        });
      }
    });
  };

  return (
    <Modal open={openConfirmCode} onCancel={() => setOpenConfirmCode(false)} footer={false}>
      <Form layout='vertical' onFinish={onConfirmFinish}>
        <Form.Item className='mt-5' label='Код подтверждения' name='confirmToken'>
          <Input className='text-center text-2xl' />
        </Form.Item>

        <Btn className='mt-2 flex justify-center m-auto' htmlTypeButton='submit' loading={isConfirmLoading}>
          Отправить
        </Btn>
      </Form>
    </Modal>
  );
};
