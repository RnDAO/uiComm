import React, { useState } from 'react';
import TcButtonGroup from '../../shared/TcButtonGroup';
import TcButton from '../../shared/TcButton';
import clsx from 'clsx';
import TcText from '../../shared/TcText';

const permissionCategories = [
  'Access Settings',
  'Server Level',
  'Category Level',
  'Channel Level',
];

function PermissionHints() {
  const [activeCategory, setActiveCategory] =
    useState<string>('Access Settings');

  const handleButtonClick = (category: string) => {
    setActiveCategory(category);
  };

  const getDescription = (category: string) => {
    switch (category) {
      case 'Access Settings':
        return (
          <div className="pt-3">
            <TcText
              text="What does “Read” and “Write” access mean?"
              variant="subtitle2"
              fontWeight={500}
            />
            <ol className="list-disc pl-5">
              <li>
                <TcText
                  text="“Read” access refers to the following settings within Discord:"
                  variant="subtitle1"
                />
                <ul className="list-disc pl-5">
                  <li>
                    <TcText text="“Read Channel”" variant="subtitle1" />
                  </li>
                  <li>
                    <TcText text="“Read Message History”" variant="subtitle1" />
                  </li>
                </ul>
              </li>
            </ol>
            <ol className="list-disc pl-5">
              <li>
                <TcText
                  text="“Write” access refers to the following settings within Discord:"
                  variant="subtitle1"
                />
                <ul className="list-disc pl-5">
                  <li>
                    <TcText text="Send Message" variant="subtitle1" />
                  </li>
                  <li>
                    <TcText
                      text="Send Messages in Threads”"
                      variant="subtitle1"
                    />
                  </li>
                  <li>
                    <TcText text="Create Public Threads" variant="subtitle1" />
                  </li>
                  <li>
                    <TcText text="Create Private Threads" variant="subtitle1" />
                  </li>
                  <li>
                    <TcText text="Embed Links" variant="subtitle1" />
                  </li>
                  <li>
                    <TcText text="Attach Files" variant="subtitle1" />
                  </li>
                  <li>
                    <TcText
                      text="Mention @everyone, @here, and All Roles"
                      variant="subtitle1"
                    />
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        );
      case 'Server Level':
        return (
          <div className="px-3 pt-3">
            <TcText
              text="Please note that your platform’s permission settings enable the above permission controls"
              variant="subtitle2"
            />
            <ol className="list-decimal pl-4 pt-2">
              <li>
                <TcText
                  text={
                    <>
                      Navigate to the <b>“Server Settings”</b> in the top-left
                      corner of Discord
                    </>
                  }
                  variant="subtitle1"
                />
              </li>
              <li>
                <TcText
                  text={
                    <>
                      Select <b>“Role/Members”</b> (left sidebar), and then in
                      the middle of the screen check <b>Advanced permissions</b>
                    </>
                  }
                  variant="subtitle1"
                />
              </li>
              <li>
                <TcText
                  text={
                    <>
                      Then select <b>“TogetherCrew”</b> and under Advanced
                      Permissions, make sure that the following are marked as
                      [✓]
                    </>
                  }
                  variant="subtitle1"
                />

                <ol style={{ listStyleType: 'lower-alpha' }} className="pl-4">
                  <li>
                    <TcText
                      text="“Read” access settings (refer to “Access Settings” above);and/or"
                      variant="subtitle1"
                    />
                  </li>
                  <li>
                    <TcText
                      text="“Write” access settings (refer to “Access Settings” above)"
                      variant="subtitle1"
                    />
                  </li>
                </ol>
              </li>
            </ol>
            <TcText
              text={
                <>
                  Finally: Click on the <b>Refresh List</b> button on this page
                  and select the channels that have now been made available to
                  you
                </>
              }
              variant="subtitle1"
            />
          </div>
        );
      case 'Category Level':
        return (
          <div className="px-3 pt-3">
            <TcText
              text="Please note that Category-level permissions override Server-level permissions"
              variant="subtitle2"
            />
            <ol className="list-decimal pl-4 pt-2">
              <li>
                <TcText
                  text={
                    <>
                      Navigate to the <b>“Edit Category”</b> in the top-left
                      corner of Discord
                    </>
                  }
                  variant="subtitle1"
                />
              </li>
              <li>
                <TcText
                  text={
                    <>
                      Select <b>“Permissions”</b> (left sidebar), and then in
                      the middle of the screen check <b>Advanced permissions</b>
                    </>
                  }
                  variant="subtitle1"
                />
              </li>
              <li>
                <TcText
                  text={
                    <>
                      Then select <b>“TogetherCrew”</b> and under Advanced
                      Permissions, make sure that the following are marked as
                      [✓]
                    </>
                  }
                  variant="subtitle1"
                />

                <ol style={{ listStyleType: 'lower-alpha' }} className="pl-4">
                  <li>
                    <TcText
                      text="“Read” access settings (refer to “Access Settings” above);and/or"
                      variant="subtitle1"
                    />
                  </li>
                  <li>
                    <TcText
                      text="“Write” access settings (refer to “Access Settings” above)"
                      variant="subtitle1"
                    />
                  </li>
                </ol>
              </li>
            </ol>
            <TcText
              text={
                <>
                  Finally: Click on the <b>Refresh List</b> button on this page
                  and select the channels that have now been made available to
                  you
                </>
              }
              variant="subtitle1"
            />
          </div>
        );
      case 'Channel Level':
        return (
          <div className="px-3 pt-3">
            <TcText
              text="Please note that Channel-level permissions override Category-level permissions, which in turn override Server-level permissions"
              variant="subtitle2"
            />
            <ol className="list-decimal pl-4 pt-2">
              <li>
                <TcText
                  text={
                    <>
                      Navigate to the settings for a specific channel (select
                      the wheel on the right of the channel name)
                    </>
                  }
                  variant="subtitle1"
                />
              </li>
              <li>
                <TcText
                  text={
                    <>
                      Select <b>“Permissions”</b> (left sidebar), and then in
                      the middle of the screen check <b>Advanced permissions</b>
                    </>
                  }
                  variant="subtitle1"
                />
              </li>
              <li>
                <TcText
                  text={
                    <>
                      Then select <b>“TogetherCrew”</b> and under Advanced
                      Permissions, make sure that the following are marked as
                      [✓]
                    </>
                  }
                  variant="subtitle1"
                />

                <ol style={{ listStyleType: 'lower-alpha' }} className="pl-4">
                  <li>
                    <TcText
                      text="“Read” access settings (refer to “Access Settings” above);and/or"
                      variant="subtitle1"
                    />
                  </li>
                  <li>
                    <TcText
                      text="“Write” access settings (refer to “Access Settings” above)"
                      variant="subtitle1"
                    />
                  </li>
                </ol>
              </li>
            </ol>
            <TcText
              text={
                <>
                  Finally: Click on the <b>Refresh List</b> button on this page
                  and select the channels that have now been made available to
                  you
                </>
              }
              variant="subtitle1"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TcButtonGroup disableElevation className="w-full">
        {permissionCategories.map((category) => (
          <TcButton
            key={category}
            disableElevation={true}
            text={category}
            onClick={() => handleButtonClick(category)}
            className={clsx(
              'border',
              category === activeCategory
                ? 'bg-secondary text-white border-secondary'
                : 'border-secondary bg-white text-secondary'
            )}
            sx={{
              width: 'auto',
              padding: {
                xs: 'auto',
                sm: '0.4rem 1rem',
              },
            }}
          />
        ))}
      </TcButtonGroup>
      <div className="description">{getDescription(activeCategory)}</div>
    </div>
  );
}

export default PermissionHints;
