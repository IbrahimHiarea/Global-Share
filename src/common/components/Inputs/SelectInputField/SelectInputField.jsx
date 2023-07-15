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
                        inputId={name}
                        className={style.select}
                        {...field}
                        defaultValue={field.value}
                        options={selectOptions}
                        isSearchable={true}
                        placeholder={placeholder}
                        isDisabled={disabled}
                        maxMenuHeight={300}
                        classNamePrefix={'te'}
                        // menuIsOpen={true}
                        styles={{
                            dropdownIndicator: (base) => ({
                                ...base,
                                color: 'var(--natural-alpha-2)',
                            
                            }),
                            indicatorSeparator: (base) => ({
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
                                textTransform: 'capitalize',
                                color: state.isFocused ? 'var(--primary-main)' : 'var(--natural-alpha-2)',
                                border: state.isFocused ? '1px solid var(--primary-main)' : '0',
                                '&:hover':{
                                    border: state.isFocused ? '1px solid var(--primary-main)' : '0',
                                },
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                color: '',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: '',
                                fontSize: '14px'
                            }),
                            indicatorsContainer:(base) =>({
                                ...base,
                                paddingRight: '2px'
                            }),
                            placeholder:(base) => ({
                                ...base,
                                color: "var(--natural-alpha-3)",
                                fontWeight: '400',
                                fontSize: '14px',
                                textTransform: 'capitalize',
                            }),
                            input: (base) => ({
                                ...base,
                                color: 'transparent'
                            }),
                            container: (base , state) => ({
                                ...base,
                                '& + label':{
                                    color: state.isFocused ? 'var(--primary-main)' : '',
                                }
                            }),
                            menu: (base) => ({
                                ...base,
                                color: 'var(--natural-alpha-2)',
                                fontSize: '14px',
                                fontWeight: '500',
                                borderRadius: '9px',
                                boxShadow: '0 0 0 1px hsl(0deg 0% 0% / 0%), 0 4px 11px hsla(0, 0%, 0%, 0.1)'
                            }),
                            option: (base) => ({
                                ...base,
                                backgroundColor: '',
                                color: '',
                                paddingLeft:'20px',
                                textTransform:'capitalize'
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