import React from 'react';
import { Dialog, DialogProps } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { conf } from '../../../../configs';
import { Avatar } from '@mui/material';
import {
  IRoles,
  activityCompositionOptions,
} from '../../../../utils/interfaces';

interface RowDetail {
  discordId: string;
  avatar: string;
  username: string;
  roles: IRoles[];
  activityComposition: string[];
}

interface CustomDialogDetailProps extends DialogProps {
  open: boolean;
  rowDetail: RowDetail;
  options: activityCompositionOptions[];
  onClose: () => void;
}

const CustomDialogDetail: React.FC<CustomDialogDetailProps> = ({
  open,
  rowDetail,
  onClose,
  options,
  ...props
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} {...props}>
      <div className="pb-8 pt-6 px-5 space-y-6">
        <IoClose
          data-testid="close-modal-icon"
          size={40}
          onClick={handleClose}
          className="cursor-pointer float-right"
        />
        <div className="py-2 px-8 space-y-6">
          <div className="flex flex-row items-center">
            <Avatar
              src={`${conf.DISCORD_CDN}avatars/${rowDetail?.discordId}/${rowDetail?.avatar}.png`}
              alt="User Avatar"
            />
            <span className="ml-2 font-semibold text-base">
              {rowDetail?.username}
            </span>
          </div>
          <div>
            <p className="text-base pb-2 font-semibold">Roles:</p>
            <div className="flex flex-row flex-wrap">
              {rowDetail?.roles.map((role: any) => (
                <div
                  key={role.id}
                  className="flex flex-row flex-wrap items-center first:ml-0 ml-1"
                  style={{ whiteSpace: 'nowrap' }}
                  data-testid="role"
                >
                  <span
                    className="bg-white p-1 px-2 mb-2 rounded-[4px] border border-[#D1D1D1] text-xs flex items-center"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor:
                        role.color !== 0
                          ? `#${role.color.toString(16).padStart(6, '0')}`
                          : '#96A5A6',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          role.color !== 0
                            ? `#${role.color.toString(16).padStart(6, '0')}`
                            : '#96A5A6',
                        flexShrink: 0,
                      }}
                    />
                    {role.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-base pb-2 font-semibold">
              Activity composition:
            </p>
            <div className="flex flex-row flex-wrap">
              {rowDetail && rowDetail?.activityComposition.length > 0 ? (
                rowDetail?.activityComposition.map((composition: any) => {
                  const matchedOption = options.find(
                    (option) => option.name === composition
                  );
                  const backgroundColor = matchedOption
                    ? matchedOption.color
                    : '#96A5A6';

                  return (
                    <div
                      key={composition}
                      className="flex flex-row flex-wrap items-center first:ml-0 ml-1"
                      data-testid="activity-composition"
                    >
                      <span
                        className="bg-white p-1 px-2 mb-2 rounded-[4px] border border-[#D1D1D1] text-xs flex items-center"
                        style={{
                          backgroundColor: backgroundColor,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full mr-2"
                          style={{
                            backgroundColor: backgroundColor,
                            flexShrink: 0,
                          }}
                        />
                        {composition}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-row flex-wrap items-center">
                  <span
                    className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs flex items-center"
                    style={{
                      backgroundColor: '#96A5A6',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor: '#96A5A6',
                        flexShrink: 0,
                      }}
                    />
                    other{' '}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomDialogDetail;
