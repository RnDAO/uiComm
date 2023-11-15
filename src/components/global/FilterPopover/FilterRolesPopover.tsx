import React, { useState } from 'react';
import TcButton from '../../shared/TcButton';
import TcPopover from '../../shared/TcPopover';
import TcSelect from '../../shared/TcSelect';
import TcCheckbox from '../../shared/TcCheckbox';
import { FormControl, FormControlLabel, ListItem } from '@mui/material';
import TcAutocomplete from '../../shared/TcAutocomplete';

const mockRoles = [
  { name: 'Admin', id: 1, color: '#20d321' },
  { name: 'Supporter', id: 2, color: '#20d321' },
];
const autoCompleteOptions = [
  { label: 'Role 1', value: 'role1' },
  { label: 'Role 2', value: 'role2' },
];

function FilterRolesPopover() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState(new Set<number>());
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [autoCompleteValue, setAutoCompleteValue] = useState(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handleAutoCompleteChange = (newValue: any) => {
    setAutoCompleteValue(newValue);
  };

  const handleClosePopover = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
  };

  const handleRoleChange = (roleId: number, isChecked: boolean) => {
    setSelectedRoles((prevSelectedRoles) => {
      const newSelectedRoles = new Set(prevSelectedRoles);
      if (isChecked) {
        newSelectedRoles.add(roleId);
      } else {
        newSelectedRoles.delete(roleId);
      }
      return newSelectedRoles;
    });
  };

  return (
    <>
      <TcButton text={'Test'} onClick={handleButtonClick} />
      <TcPopover
        open={popoverOpen}
        anchorEl={anchorEl}
        content={
          <div className="p-4 flex flex-col space-y-2">
            <FormControl variant="standard" className="w-full">
              <TcSelect
                options={[
                  { label: 'Include', value: '1' },
                  { label: 'Exclude', value: '2' },
                ]}
              />
            </FormControl>
            <TcAutocomplete
              options={autoCompleteOptions}
              label={'Select a Role'}
              value={autoCompleteValue}
              onChange={handleAutoCompleteChange}
            />
            <div className="border border-gray-200 rounded-md p-1">
              {mockRoles.map((role) => (
                <ListItem key={role.id}>
                  <FormControlLabel
                    control={
                      <TcCheckbox
                        color="secondary"
                        value={role.id}
                        checked={selectedRoles.has(role.id)}
                        onChange={(e) =>
                          handleRoleChange(role.id, e.target.checked)
                        }
                      />
                    }
                    label={
                      <div className="flex items-center border border-[#D1D1D1] rounded-md px-3">
                        <span
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: role.color, flexShrink: 0 }}
                        />
                        <div className="text-sm">{role.name}</div>
                      </div>
                    }
                  />
                </ListItem>
              ))}
            </div>
          </div>
        }
        onClose={handleClosePopover}
      />
    </>
  );
}

export default FilterRolesPopover;
