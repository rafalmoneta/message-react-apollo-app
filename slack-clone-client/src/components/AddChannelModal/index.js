import React, { useState } from 'react'
import { Input, Button, Modal, Form } from 'semantic-ui-react'
import useCreateChannel from '../graphql/useCreateChannel';


const AddChannelModal = ({ teamId, open, onClose }) => {
  const [channelInfo, setChannelInfo] = useState({name: '', teamId: teamId});
  const createChannel = useCreateChannel();

  const onChange = (e) => {
    const { name, value } = e.target;
    setChannelInfo({...channelInfo, [name]: value});
  }

  const onSubmit = async () => {
    const channel = { teamId: parseInt(teamId, 10), name: channelInfo.name };
    console.log(channel);
    try {
      const response = await createChannel(channel);
      console.log(response)
    } catch (err) {
      console.log(err)
    }
    onClose();
  }

  return (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input required value={channelInfo.name} onChange={onChange} name='name' fluid icon='search' placeholder="Channel name..." />
        </Form.Field>
        <Form.Group widths="equal">
          <Button fluid onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} fluid>Create Channel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
  )
}
// const FormikApp = withFormik({
//   mapPropsToValues: () => ({ name: '' }),
//     handleSubmit: async (values, { props: { onClose, teamId, createChannel }, setSubmitting }) => {
//       await createChannel({ variables: { 
//         newChannel: {"name": values.name, "public": false, "teamId": teamId} 
//       } 
//     });
//       console.log(createChannel, { name: values.name, teamId, public: false});
//       onClose();
//       setSubmitting(false);
//     },
// })(AddChannelModal);

// const FormikWrapper = ({open, onClose, teamId}) => {
//   const [createChannel] = useMutation(CREATE_CHANNEL);
//   return <FormikApp teamId={teamId} open={open} onClose={onClose} createChannel={createChannel} />
// }
// export default FormikWrapper;

export default AddChannelModal;
