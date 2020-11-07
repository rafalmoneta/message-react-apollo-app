import React, { useState } from 'react'
import { Input, Button, Modal, Form } from 'semantic-ui-react'
import useAddTeamMember from '../graphql/useAddTeamMember';
import normalizeErrors from '../utilis/normalizeErrors';


const InvitePeopleModal = ({ teamId, open, onClose }) => {
  const [memberInfo, setMemberInfo] = useState({email: '', teamId: teamId});
  const [error, setErrors] = useState(null);
  const addTeamMember = useAddTeamMember();

  const onChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo({...memberInfo, [name]: value});
  }

  const onSubmit = async () => {
    const teamMember = { teamId: parseInt(teamId, 10), email: memberInfo.email };
    // console.log(teamMember);
    try {
      const response = await addTeamMember(teamMember);
      const { ok, errors } = response.data.addTeamMember;
      if(ok) {
        onClose();
      }

      if(errors) {
        console.log(normalizeErrors(errors))
        setErrors(normalizeErrors(errors));
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add People to your Team</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input required value={memberInfo.email} onChange={onChange} name='email' fluid icon='search' placeholder="User's email" />
        </Form.Field>
        <Form.Group widths="equal">
          <Button fluid onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} fluid>Add User</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
  )
}

export default InvitePeopleModal;
