import _ from 'lodash';
 
export default (err) => {
  return err.errors.map(errorItem => { 
    return { path: errorItem.path, message: errorItem.message }; 
  });
};