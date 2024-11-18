/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import {
  Alert,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FaTags } from 'react-icons/fa';

import useAppStore from '@/store/useStore';

import { useToken } from '@/context/TokenContext';
import { debounce } from '@/helpers/helper';

import TcButton from '../shared/TcButton';
import TcInput from '../shared/TcInput';

type IFilterByCategoryProps = {
  handleFetchHeatmapByCategories?: (payload: {
    includeExclude: string;
    selectedCategoryIds: string[];
    allCategories: boolean;
  }) => void;
};

interface ICategory {
  categoryId: number;
  description: string;
  name: string;
  color: string;
}

const FilterByCategory = ({
  handleFetchHeatmapByCategories,
}: IFilterByCategoryProps) => {
  const { community, selectedPlatform } = useToken();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [includeExclude, setIncludeExclude] = useState<'include' | 'exclude'>(
    'include'
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { retrievePlatformProperties } = useAppStore();

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const fetchPlatformProperties = async (
    page: number = 1,
    search: string = ''
  ) => {
    if (page === 1) setInitialLoading(true);

    setLoading(true);
    const response = await retrievePlatformProperties({
      platformId: selectedPlatform,
      ngu: undefined,
      property: 'category',
      page: page,
      limit: limit,
      name: search,
    });

    setCategories((prevCategories) => {
      if (page === 1) return response.results ?? [];
      return [...prevCategories, ...response.results];
    });
    setLoading(false);
    setInitialLoading(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSearchQuery('');
    setCategories([]);
    fetchPlatformProperties();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchQuery('');
    setPage(1);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      event.currentTarget.scrollHeight ===
      event.currentTarget.scrollTop + event.currentTarget.clientHeight;

    if (bottom && !loading) {
      const nextPage = page + 1;
      fetchPlatformProperties(nextPage, searchQuery);
      setPage(nextPage);
    }
  };

  const debouncedFetchCategories = debounce((query: string) => {
    setPage(1);
    fetchPlatformProperties(1, query).then(() => setLoading(false));
  }, 700);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const value = event.target.value;
    setSearchQuery(value);
    debouncedFetchCategories(value);
  };

  const handleIncludeExcludeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIncludeExclude(event.target.value as 'include' | 'exclude');
  };

  const handleSaveCategories = () => {
    const selectedCategoryIds = selectedCategories.map((category) =>
      category.categoryId.toString()
    );

    const payload = {
      includeExclude,
      selectedCategoryIds,
      allCategories: selectedCategories.length === 0 ? true : false,
    };

    if (handleFetchHeatmapByCategories) {
      handleFetchHeatmapByCategories(payload);
    }

    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'category-popover' : undefined;

  return (
    <div className='min-w-1/2 mt-2 flex flex-row items-center rounded-md bg-gray-background px-3 py-1.5 md:mt-0 md:w-auto md:py-2'>
      <FaTags size={20} className='mr-3 text-black' />
      <button
        aria-describedby={id}
        onClick={handleClick}
        className='rounded-md px-2 hover:bg-lite active:bg-white'
      >
        By category (
        {selectedCategories.length === 0 ? 'All' : selectedCategories.length})
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            maxWidth: '450px',
          },
        }}
      >
        <Box px={2} py={2}>
          <Typography variant='body1' fontWeight='bold' pb={1}>
            Select categories to view activity
          </Typography>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              multiple
              id='category-autocomplete'
              options={categories}
              freeSolo
              openOnFocus={false}
              open={false}
              value={selectedCategories}
              onChange={(event, newValue) => {
                const filteredCategories = newValue.filter(
                  (value): value is ICategory => typeof value !== 'string'
                );
                setSelectedCategories(filteredCategories);
              }}
              onInputChange={(event, value) => {
                setSearchQuery(value);
                debouncedFetchCategories(value);
              }}
              getOptionLabel={(option: any) => option.name}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    label={option.name}
                    size='small'
                    sx={{
                      borderRadius: '4px',
                      borderColor: '#96A5A6',
                      backgroundColor: '#96A5A6',
                      color: '#000',
                    }}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TcInput
                  {...params}
                  variant='filled'
                  label='Categories'
                  placeholder='Select one or more categories'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              )}
              sx={{ width: '100%' }}
            />
          </FormControl>

          <div className='flex flex-row space-y-2 px-2'>
            {selectedCategories.length > 0 && (
              <FormControl component='fieldset' className='mt-3' fullWidth>
                <RadioGroup
                  row
                  aria-label='category-filter'
                  name='category-filter'
                  value={includeExclude}
                  onChange={handleIncludeExcludeChange}
                  sx={{ justifyContent: 'space-between' }}
                >
                  <FormControlLabel
                    value='include'
                    control={<Radio />}
                    label='Include'
                    sx={{ marginRight: 2 }}
                  />
                  <FormControlLabel
                    value='exclude'
                    control={<Radio />}
                    label='Exclude'
                    sx={{ marginLeft: 2 }}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </div>
          <Box
            className='mt-3 max-h-[300px] overflow-y-auto rounded-lg border border-gray-300'
            onScroll={handleScroll}
          >
            {initialLoading ? (
              <Box className='flex justify-center py-8'>
                <CircularProgress size={42} />
              </Box>
            ) : categories.length === 0 ? (
              <Typography
                variant='body2'
                py={4}
                textAlign='center'
                color='textSecondary'
                className='italic text-gray-500'
              >
                No categories found.
              </Typography>
            ) : (
              categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <Box
                    key={category.categoryId}
                    className='flex cursor-pointer items-center rounded px-4 py-3 transition-all duration-200 ease-in-out hover:bg-gray-100'
                    onClick={() =>
                      setSelectedCategories((prevSelected) =>
                        isSelected
                          ? prevSelected.filter(
                              (selected) =>
                                selected.categoryId !== category.categoryId
                            )
                          : [...prevSelected, category]
                      )
                    }
                  >
                    <Checkbox
                      checked={isSelected}
                      className='mr-3'
                      size='small'
                      disableRipple
                    />
                    <span
                      style={{
                        backgroundColor: `#${category.color}`,
                      }}
                      className='mr-3 inline-block h-3.5 w-3.5 rounded-full border border-gray-300 shadow-sm'
                    />
                    <Typography
                      variant='body2'
                      className='font-semibold text-gray-800'
                    >
                      {category.name}
                    </Typography>
                  </Box>
                );
              })
            )}
          </Box>
          <Alert severity='info' className='mt-4 rounded-lg'>
            In order to see activities for all categories, please don't select
            any category.
          </Alert>
          <Box pt={2}>
            <TcButton
              text='Save categories'
              variant='contained'
              fullWidth
              onClick={handleSaveCategories}
            />
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default FilterByCategory;
