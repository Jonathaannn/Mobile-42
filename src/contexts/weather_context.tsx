import React, { createContext, useState, ReactNode } from "react";

interface Geolocation {
	currentLocation: any;
	city: any;
}

interface GeolocationContextType {
	geolocation: Geolocation | null;
	setGeolocation: (data: Geolocation) => void;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(
	undefined
);

interface GeolocationProviderProps {
	children: ReactNode;
}

export const GeolocationProvider = ({ children }: GeolocationProviderProps) => {
	const [geolocation, setGeolocation] = useState<Geolocation | null>(null);

	return (
		<GeolocationContext.Provider value={{ geolocation, setGeolocation }}>
			{children}
		</GeolocationContext.Provider>
	);
};

export const useGeolocation = (): GeolocationContextType => {
	const context = React.useContext(GeolocationContext);
	if (!context) {
		throw new Error("useGeolocation must be used within a GeolocationProvider");
	}
	return context;
};
