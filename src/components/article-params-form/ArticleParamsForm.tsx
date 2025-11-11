import { useState, useRef, FormEvent, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApplyParams: (state: ArticleStateType) => void;
	onResetParams: () => void;
	initialState: ArticleStateType;
	appliedState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApplyParams,
	onResetParams,
	initialState,
	appliedState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);
	const containerRef = useRef<HTMLDivElement>(null);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
	if (!isFormOpen) {
		return;
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node) &&
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsFormOpen(false);
		}
	};

	document.addEventListener('mousedown', handleClickOutside);

	return () => {
		document.removeEventListener('mousedown', handleClickOutside);
	};
}, [isFormOpen]);

	useEffect(() => {
		if (isFormOpen) {
			setFormState(appliedState);
		}
	}, [isFormOpen]);

	const toggleFormSidebar = () => {
		setIsFormOpen((prev) => !prev);
	};

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: option,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApplyParams(formState);
	};

	const handleResetParams = () => {
		setFormState(initialState);
		onResetParams();
	};

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isFormOpen} onClick={toggleFormSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.title}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<div className={styles.fontSizeWrapper}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>
					<div className={styles.separatorWrapper}>
						<div className={styles.customSeparator}></div>
					</div>
					<div className={styles.backgroundColorWrapper}>
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
						/>
					</div>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetParams}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
