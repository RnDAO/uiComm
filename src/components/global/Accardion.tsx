import React, { ReactElement } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';

type AcProps = {
  readonly title?: string;
  childs: AcChildProps[];
};

type AcChildProps = {
  title: string;
  id: string;
  icon?: ReactElement;
  detailsComponent: ReactElement;
};

export default function Accardion({ title, childs }: AcProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <p className="text-lite-gray text-sm pt-4">{title}</p>
      {childs.map((el) => (
        <Accordion
          className={
            expanded === el.id ? 'shadow-base my-5 rounded-xl' : 'my-5'
          }
          expanded={expanded === el.id}
          onChange={handleChange(el.id)}
          id={el.id}
          key={el.id}
          disableGutters
          sx={{
            boxShadow: 'none',
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <MdExpandMore color="#37474F" size={25} fill="#37474F" />
            }
            aria-controls={`${el.id}-content`}
            id={el.id}
          >
            <div className="flex flex-row items-center space-x-3">
              <div className="h-8 w-8 text-xs md:text-lg md:h-8 md:w-8 bg-gray-background rounded-full justify-center flex font-bold text-gray-500	items-center text-center">
                {el.icon}
              </div>
              <p className="font-bold text-base">{el.title}</p>
            </div>
          </AccordionSummary>
          <AccordionDetails className="mx-4 mb-3 md:ml-11">
            {el.detailsComponent}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
