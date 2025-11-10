import { useState, useRef, FormEvent, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
// import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
	initialState: ArticleStateType;
	appliedState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
	initialState,
	appliedState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);
	const containerRef = useRef<HTMLDivElement>(null);
	const sidebarRef = useRef<HTMLElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: containerRef,
		onChange: setIsOpen,
	});

	useEffect(() => {
		if (isOpen) {
			setFormState(appliedState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const handleToggleSidebar = () => {
		setIsOpen((prev) => !prev);
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
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(initialState);
		onReset();
	};

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
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
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
