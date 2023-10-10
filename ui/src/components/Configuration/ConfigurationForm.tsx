import React from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { PromDataSource } from '../../../../types';
import { setEntryForm, setPrometheusDataSources } from '../../reducers/configurationReducer';
import Client from '../../models/Client';
import styles from './config.module.scss'

const ConfigurationForm = (): React.JSX.Element => {

  //dispatch
  const dispatch = useAppDispatch();

  // State
  const formState = useAppSelector(store => store.configuration.entryForm);
  const typeOptions = useAppSelector(store => store.configuration.typeOfEndpoint);

  // Create options for dropdown
  const options: React.JSX.Element[] = [];
  for (let opt of typeOptions) {
    options.push(
      <option key={`optid_${opt.id}`} value={opt.id}>{opt.type_of}</option>
    )
  }

  // Update state on inputs
  function handleInput(e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>, key: keyof PromDataSource) {
    // Make current form data deep copy
    const copyOfFormData: any = {...formState};
    // Change the key to the event target value
    copyOfFormData[key] = e.target.value;
    dispatch(setEntryForm(copyOfFormData));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();
    try {
      const { type_of_id, url, endpoint, jobname, match, ssh_key } = formState;
      const res = await Client.ConfigService.createDataSource(type_of_id, url, jobname, endpoint, match, ssh_key);
      if (res !== null) dispatch(setPrometheusDataSources(await Client.ConfigService.getDataSources()));
      // Set defaults
      dispatch(setEntryForm({ url: '', endpoint: '', jobname: '', match: '', ssh_key: '', type_of_id: formState.type_of_id }));
    } catch (error) {
      // Show warning to user here

    }
  }

  return (
    <form action="" className={styles.containerCard}>
      <h3 className={styles.hh}>Upload New Configuration</h3>
      <div className = {styles.wrapTI}>
      <div className = {styles.titles}>
        <label htmlFor="">Type </label>
        <label htmlFor="">URL </label>
        <label htmlFor="">Endpoint </label>
        <label htmlFor="">Job Name </label>
        <label htmlFor="">Match </label>
      </div>
      <div className = {styles.inputs}>
      <select name="" id="endpoint_types" value={formState.type_of_id} onChange={(e)=>handleInput(e, 'type_of_id')} >
        {options}
        </select>
        <input type="text" value={formState.url} onChange={(e) => handleInput(e, 'url')} />
        <input type="text" value={formState.endpoint} onChange={(e) => handleInput(e, 'endpoint')} />
        <input type="text" value={formState.jobname} onChange={(e) => handleInput(e, 'jobname')} />
        <input type="text" value={formState.match} onChange={(e) => handleInput(e, 'match')} />
        </div>
      </div>
       <input className={styles.Sub} type="submit" name="Submit" onClick={handleSubmit} />
  
    </form>
  );
}



export default ConfigurationForm;