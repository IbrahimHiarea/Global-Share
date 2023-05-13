//import react
import React from "react";
import { Controller } from "react-hook-form";

//import components
import InputWrapper from '../InputWrapper/InputWrapper';
import Select from 'react-select';

//import style
import style from './SelectInputField.module.css';

function SelectInputField({
        children, width, height,
        name, options, placeholder,
        control, errors , disabled,
        required
    }){
    const selectOptions = [].concat( options.map((item) => {
            return {'value': item , "label": item}
        }));
    return(
        <InputWrapper name={name} label={children} errors={errors}>
            <Controller 
                name={name}
                control={control}
                render={({field}) => (
                    <Select 
                        className={style.select}
                        id={name}
                        {...field}
                        defaultValue={field.value}
                        options={selectOptions}
                        isSearchable={true}
                        placeholder={placeholder}
                        isDisabled={disabled}
                        maxMenuHeight={300}
                        classNamePrefix={'te'}
                        styles={{
                            dropdownIndicator: (base , state) => ({
                                ...base,
                                color: 'var(--natural-alpha-2)',
                            
                            }),
                            indicatorSeparator: (base , state) => ({
                                ...base,
                                display: 'none'
                            }),
                            control: (base , state) => ({
                                ...base,
                                width: width,
                                height: height, 
                                fontSize: '15px',
                                borderRadius: '9px',
                                paddingLeft: '4px',
                                boxShadow: 'none',
                                color: state.isFocused ? 'var(--primary-main)' : 'var(--natural-alpha-2)',
                                border: state.isFocused ? '1px solid var(--primary-main)' : '0',
                                '&:hover':{
                                    border: state.isFocused ? '1px solid var(--primary-main)' : '0',
                                },
                            }),
                            valueContainer: (base , state) => ({
                                ...base,
                                color: '',
                            }),
                            singleValue: (base , state) => ({
                                ...base,
                                color: '',
                                fontSize: '14px'
                            }),
                            indicatorsContainer:(base , state) =>({
                                ...base,
                                paddingRight: '2px'
                            }),
                            placeholder:(base , state) => ({
                                ...base,
                                color: "var(--natural-alpha-3)",
                                fontWeight: '400',
                                fontSize: '14px'
                            }),
                            input: (base , state) => ({
                                ...base,
                                color: 'transparent'
                            }),
                            container: (base , state) => ({
                                ...base,
                                '& + label':{
                                    color: state.isFocused ? 'var(--primary-main)' : '',
                                }
                            }),
                            menu: (base , state) => ({
                                ...base,
                                color: 'var(--natural-alpha-2)',
                                fontSize: '14px',
                                fontWeight: '500',
                                borderRadius: '9px'
                            }),
                            option: (base , state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? 'var(--primary-light)' : 'white',
                                paddingLeft:'20px',
                            })
                        }}
                    />
                )}
                rules={{required: required}}
            />
        </InputWrapper>
    );
}

export default SelectInputField;