import Papa from "papaparse";

const bigPapa = (url, setState) => {
	Papa.parse(
		"https://firebasestorage.googleapis.com/v0/b/mlforall-14bf7.appspot.com/o/UDjMojFqWHOdW0fCIJPMNPScQ9p1%2FSpotify%2Fsimple_top50.csv?alt=media&token=5f55645b-1884-47ee-b504-5e7f835cfa20",
		{
			download: true,
			worker: true,
			header: true,
			dynamicTyping: true,
			complete: (results) => {
				console.log("All done!", results);
				setState({ temporary: results });
			}
		}
	);
};

export default bigPapa;
