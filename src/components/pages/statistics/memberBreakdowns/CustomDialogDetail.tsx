import { Dialog, DialogProps } from '@mui/material';
import { Avatar } from '@mui/material';
import React from 'react';
import { IoClose } from 'react-icons/io5';

import { conf } from '../../../../configs';
import { IActivityCompositionOptions } from '../../../../utils/interfaces';

interface CustomDialogDetailProps extends DialogProps {
  open: boolean;
  rowDetail: any;
  options: IActivityCompositionOptions[];
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
      <div className='space-y-6 px-5 pb-8 pt-6'>
        <IoClose
          data-testid='close-modal-icon'
          size={40}
          onClick={handleClose}
          className='float-right cursor-pointer'
        />
        <div className='space-y-6 py-2 px-8'>
          <div className='flex flex-row items-center'>
            <Avatar
              src={
                rowDetail?.discordId
                  ? `${conf.DISCORD_CDN}avatars/${rowDetail.discordId}/${rowDetail?.avatar}.png`
                  : rowDetail?.avatar
              }
              alt='User Avatar'
            />
            <span className='ml-2 text-base font-semibold'>
              {rowDetail?.username}
            </span>
          </div>
          {rowDetail?.role && (
            <div>
              <p className='pb-2 text-base font-semibold'>Roles:</p>
              <div className='flex flex-row flex-wrap'>
                {rowDetail?.roles.map((role: any) => (
                  <div
                    key={role.roleId}
                    className='ml-1 flex flex-row flex-wrap items-center first:ml-0'
                    style={{ whiteSpace: 'nowrap' }}
                    data-testid='role'
                  >
                    <span
                      className='mb-2 flex items-center rounded-[4px] border border-[#D1D1D1] bg-white p-1 px-2 text-xs'
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
                        className='mr-2 h-2 w-2 rounded-full'
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
          )}
          <div>
            <p className='pb-2 text-base font-semibold'>
              Activity composition:
            </p>
            <div className='flex flex-row flex-wrap'>
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
                      className='ml-1 flex flex-row flex-wrap items-center first:ml-0'
                      data-testid='activity-composition'
                    >
                      <span
                        className='mb-2 flex items-center rounded-[4px] border border-[#D1D1D1] bg-white p-1 px-2 text-xs'
                        style={{
                          backgroundColor: backgroundColor,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          className='mr-2 h-2 w-2 rounded-full'
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
                <div className='flex flex-row flex-wrap items-center'>
                  <span
                    className='flex items-center rounded-[4px] border border-[#D1D1D1] bg-white p-1 px-2 text-xs'
                    style={{
                      backgroundColor: '#96A5A6',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      className='mr-2 h-2 w-2 rounded-full'
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
