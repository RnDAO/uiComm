import React from 'react';
import TcText from '../../shared/TcText';
import TcButton from '../../shared/TcButton';
import TcRolesAutoComplete from '../../announcements/create/privateMessaageContainer/TcRolesAutoComplete';
import TcUsersAutoComplete from '../../announcements/create/privateMessaageContainer/TcUsersAutoComplete';
import { IRoles, IUser } from '../../../utils/interfaces';

function TcRolesAndPermissionsContainer() {
  return (
    <div className="border-t border-b-gray-200">
      <div className="w-full flex justify-between items-center">
        <div>
          <TcText text="Roles & Permissions" variant="h6" />
          <TcText
            text="Configure the following for Admins vs. Viewers"
            variant="body2"
            className="text-gray-400"
          />
        </div>
        <TcButton text="Save Changes" variant="contained" />
      </div>
      <div>
        <TcText text="Admins" variant="subtitle1" />
        <TcText
          text="Admins have full access to the account. They can manage members, permissions and other settings of the account."
          variant="body2"
          className="text-gray-400"
        />
        <TcText text="Add admin by:" variant="subtitle2" />
        <div className="flex justify-between space-x-3">
          <div className="w-1/2">
            <TcRolesAutoComplete
              isDisabled={false}
              handleSelectedUsers={() => {}}
            />
          </div>
          <div className="w-1/2">
            <TcUsersAutoComplete
              isDisabled={false}
              handleSelectedUsers={() => {}}
            />
          </div>
        </div>
      </div>
      <div>
        <TcText text="Viewers" variant="subtitle1" />
        <TcText
          text="Viewers can see all the metrics but don't have permission to change the settings."
          variant="body2"
          className="text-gray-400"
        />
        <TcText text="Add viewer by:" variant="subtitle2" />
        <div className="flex justify-between space-x-3">
          <div className="w-1/2">
            <TcRolesAutoComplete
              isDisabled={false}
              handleSelectedUsers={() => {}}
            />
          </div>
          <div className="w-1/2">
            <TcUsersAutoComplete
              isDisabled={false}
              handleSelectedUsers={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TcRolesAndPermissionsContainer;
