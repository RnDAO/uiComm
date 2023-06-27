import React from 'react';
import { Dialog, DialogProps } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { conf } from '../../../../configs';
import { Avatar } from '@mui/material';

interface CustomDialogDetailProps extends DialogProps {
  open: boolean;
  rowDetail: any;
  onClose: () => void;
}

const options = [
  { name: 'All active', value: 'all_active', color: '#3AAE2B' },
  { name: 'Newly active', value: 'all_new_active', color: '#FF9022' },
  { name: 'Consistently active', value: 'all_consistent', color: '#804EE1' },
  { name: 'Vital member', value: 'all_vital', color: '#313671' },
  { name: 'Became disengaged', value: 'all_new_disengaged', color: '#EB3E56' },
  { name: 'Others', value: 'others', color: '#AAAAAA' },
];

const CustomDialogDetail: React.FC<CustomDialogDetailProps> = ({
  open,
  rowDetail,
  onClose,
  ...props
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} {...props}>
      <div className="pb-8 pt-6 px-5 space-y-6">
        <IoClose
          size={40}
          onClick={handleClose}
          className="cursor-pointer float-right"
        />
        <div className="py-6 px-8 space-y-6">
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
            <p className="text-xs pb-2 font-semibold">Roles:</p>
            <div className="flex flex-row space-x-2 flex-wrap">
              {rowDetail?.roles.map((role: any) => (
                <div
                  key={role.id}
                  className="flex flex-row flex-wrap"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <span
                    className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs"
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
                      className="w-2 h-2 rounded-full mr-1"
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
            <p className="text-xs pb-2 font-semibold">Activity composition:</p>
            <div className="flex flex-row space-x-2 flex-wrap">
              {rowDetail && rowDetail?.activityComposition.length > 0 ? (
                rowDetail?.activityComposition.map((composition: any) => {
                  const matchedOption = options.find(
                    (option) => option.value === composition
                  );
                  const backgroundColor = matchedOption
                    ? matchedOption.color
                    : '#96A5A6';

                  return (
                    <div
                      key={composition}
                      className="flex flex-row flex-wrap items-center"
                    >
                      <span
                        className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs flex items-center"
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
