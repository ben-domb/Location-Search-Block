import React, { useState } from "react";

import {
	initializeBlock,
	FormField,
	Input,
	Button,
	Box,
	// Text,
} from "@airtable/blocks/ui";

// import {FieldType} from '@airtable/blocks/models';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	// InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxOption,
} from "@reach/combobox";

const libraries = ["places"];
const mapContainerStyle = {
	width: "100%",
	height: "300px",
};
const center = {
	lat: 51.509865,
	lng: -0.118092,
};

function TodoBlock() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "OUR_API_KEY",
		libraries,
	});

	const [markers, setMarkers] = React.useState([]);

	if (loadError) return "Error loading Map";
	if (!isLoaded) return "loading";
	return (
		<div>
			{/* <Box padding={3} borderBottom="thick">
				<FormField label="Input search postcode">
					<Input placeholder="Postcode" width="320px" tabIndex={0} />
				</FormField>
				<Text>Postcode: {tabIndex}</Text>
			</Box> */}
			<Box padding={3} borderBottom="thick">
				{/* <Input
					value={input}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					placeholder="Enter an address"
				/> */}
				<Search />
			</Box>
			<Box padding={3} borderBottom="thick">
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					zoom={9}
					center={center}
					onClick={(event) => {
						setMarkers((current) => [
							...current,
							{
								lat: event.latLng.lat(),
								lng: event.latLng.lng(),
								time: new Date(),
							},
						]);
					}}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.time.toISOString()}
							position={{ lat: marker.lat, lng: marker.lng }}
						/>
					))}
				</GoogleMap>
			</Box>
		</div>
	);
}

function Search() {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete();

	const [input, setInput] = useState("");

	return (
		<div>
			<Box display="flex" padding={0}>
				<FormField label="Please type in the address/postcode of the parent/guardian, then click 'Enter Address' button">
					<Box display="flex" padding={0}>
						<Input
							flex="auto"
							placeholder="Enter an address"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<Button
							// onClick={() => console.log("button pressed")}
							onClick={() => {
								console.log({ input });
							}}
							variant="primary"
							marginLeft={2}
							type="submit"
						>
							Enter Address
						</Button>
					</Box>
				</FormField>
			</Box>
			<Box paddingTop={3}>
				<Combobox
					onSelect={async (address) => {
						setValue(address, false);
						clearSuggestions();
						try {
							const results = await getGeocode({ address });
							const { lat, lng } = await getLatLng(results[0]);
							console.log({ lat, lng });
						} catch (error) {
							console.log("error");
						}
					}}
				>
					<ComboboxInput
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						disabled={!ready}
						placeholder="Enter an address"
					/>
					<ComboboxPopover>
						{status === "OK" &&
							data.map(({ id, description }) => (
								<ComboboxOption key={id} value={description} />
							))}
					</ComboboxPopover>
				</Combobox>
			</Box>
		</div>
	);
}

initializeBlock(() => <TodoBlock />);
