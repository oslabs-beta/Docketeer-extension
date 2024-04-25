import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import styles from './ImageCard.module.scss';
import { ImageCardProps } from '../../../../types';
import {
	VulnerabilityPayload,
	ScanObject,
	ScanReturn,
	EverythingPayload,
	Top3Payload,
} from '../../../ui-types';
import { GrypeScan } from '../../../../backend/backend-types';
import Client from '../../models/Client';
import {
	updateVulnerabilities,
	updateTop3,
	addEverything,
	updateTime,
	updateIsSaved,
} from '../../reducers/imageReducer';
import DeleteIcon from '../../../assets/trash.svg';
import PlayIcon from '../../../assets/play.svg';
import ImageCardDropdown from './ImageCardDropdown/ImageCardDropdown';
import DropdownIcon from '../../../assets/drop-down-arrow.png';
import DropupIcon from '../../../assets/drop-up-arrow.png';
import PieChart from '../../../assets/piechart.svg';
import GraphModal from './GraphModal/GraphModal';

/**
 * @module | ImageCard.tsx
 * @description | new components for images dashboard
 **/

interface DropDown {
	critical: boolean;
	high: boolean;
	medium: boolean;
	low: boolean;
	negligible: boolean;
	unknown: boolean;
}

const ImageCard = ({
	imgObj,
	runImageAlert,
	removeImageAlert,
	index,
	reset,
	setReset,
	isHovered,
}: ImageCardProps): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [done, setDone] = useState<boolean>(false); // state for scan finish or not
	const [graphModal, setgraphModal] = useState<boolean>(false);
	// state for Learn More
	const [modalToggler, setModalToggler] = useState<boolean>(false);
	// DROPDOWN INFO CARD
	const [dropDown, setDropDown] = useState<DropDown>({
		critical: false,
		high: false,
		medium: false,
		low: false,
		negligible: false,
		unknown: false,
	});

	// get vulnerabilities directly from the store
	let vulnerabilities: object | boolean =
		useAppSelector((state) => state.images.imagesList[index].Vulnerabilities) ||
		false;

	const getScan = async (scanName: string, scanType: string): Promise<void> => {
		try {
			setDone(false);
			// reset dropdown
			if (reset) setDropDown({
				critical: false,
				high: false,
				medium: false,
				low: false,
				negligible: false,
				unknown: false,
			});
			// get the current time of the User to scan in backend
			const timeStamp: string = new Date().toLocaleString();

			// retrieve scan data - Client.ImageService.getScan creates DDClient Request
			const scanObjectReturn: ScanReturn =
				scanType === 'getScan'
					? await Client.ImageService.getScan(scanName, timeStamp)
					: await Client.ImageService.getRescan(scanName, timeStamp);
			const vulnerabilityObj: ScanObject = scanObjectReturn.vulnerabilites;

			const newTimeStamp: string = scanObjectReturn.timeStamp;
			dispatch(updateTime({ timeStamp: newTimeStamp }));

			const isSaved: boolean = scanObjectReturn.saved;
			dispatch(updateIsSaved({ isSaved }));

			setDone(true);

			console.log('scanObjectReturn JSON FOR GRYPE: ', scanObjectReturn);
			console.log(`Success from getScan: ${scanName}`, vulnerabilityObj);
			console.log(`TIMESTAMP FOR ${scanName}`, scanObjectReturn.timeStamp);

			/* get the info from 5 levels
			ex everything: [{ Package: "busybox", Severity: "Low", Version Installed: "1.36.1", Vulnerability ID: "CVE..." }]
			-> filter each severity into an array of critical objects, array of high objects, etc */
			const everything: GrypeScan[] = scanObjectReturn.everything;
			const critical: GrypeScan[] = everything.filter(
				(el) => el.Severity === 'Critical'
			);
			const high: GrypeScan[] = everything.filter(
				(el) => el.Severity === 'High'
			);
			const medium: GrypeScan[] = everything.filter(
				(el) => el.Severity === 'Medium'
			);
			const low: GrypeScan[] = everything.filter(
				(el) => el.Severity === 'Low'
			);
			const negligible: GrypeScan[] = everything.filter(
				(el) => el.Severity === 'Negligible'
			);
			const unknown: GrypeScan[] = everything.filter(
				(el) => el.Severity === 'Unknown'
			);

			const everythingObj: EverythingPayload = {
				everything: {
					critical,
					high,
					medium,
					low,
					negligible,
					unknown,
				},
				scanName,
			};
			dispatch(addEverything(everythingObj));

			/* Get top 3 in an obj
				 {"busybox": count
					"crytpo": count,
					"notbusybox": count }
			 */

			// Dispatch top 3 object with 5 levels to imageList Store in imageReducer
			const top3Obj: Top3Payload = {
				top3Obj: {
					critical: top3Info(critical),
					high: top3Info(high),
					medium: top3Info(medium),
					low: top3Info(low),
					negligible: top3Info(negligible),
					unknown: top3Info(unknown),
				},
				scanName,
			};
			dispatch(updateTop3(top3Obj));

			// if the image failed to be scanned for vulnerabilities, update the image card state to have a default vulnerability object
			if (vulnerabilityObj === undefined) {
				const defaultVul: VulnerabilityPayload = {
					vulnerabilityObj: {
						Critical: '-',
						High: '-',
						Medium: '-',
						Low: '-',
						Negligible: '-',
						Unknown: '-',
					},
					scanName,
				};
				dispatch(updateVulnerabilities(defaultVul));
				return;
			}

			// create an object of type VulnerabilityPayload with the returned vulnerability object and the scanName
			const updateVul: VulnerabilityPayload = { vulnerabilityObj, scanName };

			// dispatch VulnerabilityPayload to update the imgObj in the store with the vulnerability info
			dispatch(updateVulnerabilities(updateVul));
			console.log('after reducuer invoked', imgObj);
			return;
		} catch (error) {
			// Log error if failed
			console.log('getScan has failed to get vulnerabilities: ', error);
		}
	};

	// Iterate over each array of critical objects and return an array of the top 3
	const top3Info = (levelArray: GrypeScan[]): object => {
		const levelObj = {};
		levelArray.forEach((el) => {
			levelObj[el.Package] = (levelObj[el.Package] || 0) + 1;
		});
		// Ex for entries: [['busybox', 6], ['crypto', 10], ['another package name', 28]]
		const entries: [string, number][] = Object.entries(levelObj);
		const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
		return sortedEntries.slice(0, 3);
	};

	const toggleDropdown = (criticalType: string): void => {
		setDropDown((prevState) => {
			const check = Object.values(dropDown).filter((el) => el).length;
			if (check && !prevState[criticalType]) {
				for (let key in prevState) {
					prevState[key] = false;
				}
				prevState[criticalType] = true;
			} else if (!check) prevState[criticalType] = true;
			else prevState[criticalType] = false;
			return { ...prevState };
		});
	};

	const toggleArrow = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void => {
		event.stopPropagation(); // Stop event propagation here
		setDropDown((prevState) => {
			// length is 0 if none opened, >= if one is opened
			const check = Object.values(dropDown).filter((el) => el).length;
			if (check) {
				for (let key in prevState) {
					prevState[key] = false;
				}
			} else prevState.critical = true;
			return { ...prevState };
		});
	};

	// Array to print out all levels
	const levels: string[] = [
		'Critical',
		'High',
		'Medium',
		'Low',
		'Negligible',
		'Unknown',
	];
	const printVul: React.JSX.Element[] = levels.map((el, i) => {
		return (
			<div className={styles.imgVulDiv} key={i}>
				<p
					onClick={() => toggleDropdown(el.toLowerCase())}
					style={
						isHovered === el && vulnerabilities[el]
							? { filter: 'brightness(1.3)', transform: 'translateY(-3px)' }
							: undefined
					}
					className={`${
						reset
							? styles.grayOut
							: vulnerabilities[el]
							? styles[el.toLowerCase()]
							: done
							? styles.green
							: styles.grayOut
					}`}>
					{vulnerabilities[el] && (
						<span className={styles.vulNum}>
							{vulnerabilities[el] ? vulnerabilities[el] : ''}
						</span>
					)}{' '}
					{`${el[0]}`}
				</p>
			</div>
		);
	});

	// UPON MOUNTED
	useEffect(() => {
		if (!vulnerabilities) getScan(imgObj.ScanName, 'getScan');
		else setDone(true); // keep the green check
	}, []);

	// RESCAN
	useEffect(() => {
		if (reset) {
			getScan(imgObj.ScanName, 'getRescan');
			setReset(false);
		}
	}, [reset]);

	return (
		<div
			className={
				reset
					? styles.imageCard
					: done && Object.keys(vulnerabilities).length >= 4
					? styles.imageCardCrit
					: done && Object.keys(vulnerabilities).length === 3
					? styles.imageCardHigh
					: done && Object.keys(vulnerabilities).length === 2
					? styles.imageCardMed
					: done && Object.keys(vulnerabilities).length === 1
					? styles.imageCardLow
					: done && Object.keys(vulnerabilities).length === 0
					? styles.imageCardDone
					: styles.imageCard
			}
			onDoubleClick={(event) => toggleArrow(event)}
			style={
				!graphModal && !modalToggler
					? { backdropFilter: 'blur(4px)' }
					: undefined
			}
			onMouseEnter={() => console.log()}>
			{/* vulnerability info card changing border color based on level found */}

			<div className={styles.imageInfo}>
				{/* image scanName: LEFT SIDE */}

				<div style={{ cursor: 'pointer' }}>
					<p className={styles.ImageName}>{imgObj['Repository']} </p>
					<p className={styles.ImageTag}>Version: {imgObj['Tag']}</p>
				</div>
				{/* VULNERABILITY LEVELS*/}
				<div className={styles.VulnerabilitiesBlock}>
					<p>
						{vulnerabilities &&
							`Total Vulnerabilities (${Object.values(vulnerabilities).reduce(
								(acc: any, curr: any) => acc + curr,
								0
							)})`}
					</p>
					<p>Severity Levels</p>

					<div className={styles.imageVulnerabilities}>
						{printVul}
						<img
							src={
								Object.values(dropDown).filter((el) => el).length !== 0
									? DropupIcon
									: DropdownIcon
							}
							onClick={toggleArrow}
							className={styles.dropdownIcon}
						/>
					</div>
					{/* toggler drop down info of vulnerability type clicked */}
					{dropDown.critical && (
						<ImageCardDropdown
							severity='critical'
							scanName={imgObj.ScanName}
							index={index}
							modalToggler={modalToggler}
							setModalToggler={setModalToggler}
							setgraphModal={setgraphModal}
							setDropDown={setDropDown}
						/>
					)}
					{dropDown.high && (
						<ImageCardDropdown
							severity='high'
							scanName={imgObj.ScanName}
							index={index}
							modalToggler={modalToggler}
							setModalToggler={setModalToggler}
							setgraphModal={setgraphModal}
							setDropDown={setDropDown}
						/>
					)}
					{dropDown.medium && (
						<ImageCardDropdown
							severity='medium'
							scanName={imgObj.ScanName}
							index={index}
							modalToggler={modalToggler}
							setModalToggler={setModalToggler}
							setgraphModal={setgraphModal}
							setDropDown={setDropDown}
						/>
					)}
					{dropDown.low && (
						<ImageCardDropdown
							severity='low'
							scanName={imgObj.ScanName}
							index={index}
							modalToggler={modalToggler}
							setModalToggler={setModalToggler}
							setgraphModal={setgraphModal}
							setDropDown={setDropDown}
						/>
					)}
					{dropDown.negligible && (
						<ImageCardDropdown
							severity='negligible'
							scanName={imgObj.ScanName}
							index={index}
							modalToggler={modalToggler}
							setModalToggler={setModalToggler}
							setgraphModal={setgraphModal}
							setDropDown={setDropDown}
						/>
					)}
					{dropDown.unknown && (
						<ImageCardDropdown
							severity='unknown'
							scanName={imgObj.ScanName}
							index={index}
							modalToggler={modalToggler}
							setModalToggler={setModalToggler}
							setgraphModal={setgraphModal}
							setDropDown={setDropDown}
						/>
					)}
				</div>
			</div>
			{/* RUN / REMOVE */}
			<div className={styles.buttons}>
				<img
					src={PlayIcon}
					className={styles.imgCardButton}
					onClick={() => runImageAlert(imgObj)}></img>
				<img
					src={DeleteIcon}
					className={styles.imgCardButton}
					onClick={() => removeImageAlert(imgObj)}></img>
				{/* ---- Graph Button ---- */}
				<img
					src={PieChart}
					className={done ? styles.imgCardButton : styles.imgLoading}
					onClick={() => {
						// only allow click if done scanning
						if (done) {
							setgraphModal(true);
							// reset other 2 states
							setModalToggler(false);
							setDropDown({
								critical: false,
								high: false,
								medium: false,
								low: false,
								negligible: false,
								unknown: false,
							});
						}
					}}></img>
			</div>
			{/* PIE CHART */}
			{graphModal && <div className={styles.backdrop}></div>}
			<div className={styles.modalContainer}>
				<GraphModal
					trigger={graphModal}
					setTrigger={setgraphModal}
					index={index}
					setModalToggler={setModalToggler}
					toggleDropdown={toggleDropdown}
				/>
			</div>
		</div>
	);
};

export default ImageCard;
