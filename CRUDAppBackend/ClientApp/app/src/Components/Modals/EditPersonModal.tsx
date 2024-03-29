import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SaveCancelButtonsGroup from '../SaveCancelButtonsGroup';
import { FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Person } from '../../Interfaces/Person';
import { useForm, Controller } from 'react-hook-form';
import * as Api from '../../APIs/PeopleApi';
import InputLabel from '@mui/material/InputLabel';
import '../../Styles/PeoplePageModals.css';

interface EditPersonModalProps {
  person: Person;
  open: boolean;
  onClose: () => void;
}

export default function EditPersonModal({ person, open, onClose }: EditPersonModalProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Person>();

  React.useEffect(() => {
    setValue('id', person.id);
    setValue('name', person.name);
    setValue('role', person.role);
    setValue('isPercent', person.isPercent ? true : false);
    setValue('rate', person.rate);
    setValue('phoneNumber', person.phoneNumber);
    setValue('email', person.email);
  }, [person, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  }

  const onSubmit = async (newPersonData: Person) => {
    newPersonData.isPercent = Boolean(newPersonData.isPercent);

    await Api.SavePersonEditing(newPersonData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">

        <div className="Caption">
          Edit Person
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            <div className='Text'> Id: {person.id} </div>

            <TextField
              {...register('name')}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              {...register('role')}
              id="outlined-basic"
              label="Role"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Salary type : {person.isPercent ? 'percent' : 'rate'}</InputLabel>
              <Controller
                name="isPercent"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem value={1}>percent</MenuItem>
                    <MenuItem value={0}>rate</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <TextField
              {...register('rate', {
                validate: (value) => !isNaN(Number(value)) || 'Rate must be a number',
              })}
              id="outlined-basic"
              label="Rate"
              variant="outlined"
              error={!!errors.rate}
              helperText={errors.rate?.message}
            />
            <TextField
              {...register('phoneNumber')}
              id="outlined-basic"
              label="Phone"
              variant="outlined"
            />
            <TextField
              {...register('email')}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <SaveCancelButtonsGroup SaveClick={handleSubmit(onSubmit)} CancelClick={handleClose} />
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
