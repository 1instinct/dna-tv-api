function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') {line += ','};

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
};

function isPrivate(video) {
	if (video.snippet.title.indexOf("Private video") > -1) {
		return true;
	}
	return false;
};

function hiRes(img, video) {
	if ("maxres" in img) {
		return video.snippet.thumbnails.maxres.url;
	} else if ("standard" in img) {
		return video.snippet.thumbnails.standard.url;
	} else if ("high" in img) {
		return video.snippet.thumbnails.high.url;
	} else if ("medium" in img) {
		return video.snippet.thumbnails.medium.url;
	} else if ("default" in img) {
		return null;
	} else {
		return null;
	}
}

function process(videos) {
	return videos.filter(video => !isPrivate(video)).map(function(video) {

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: video.id.videoId,
			// _id: video.id.videoId,
			title: replaceAll(video.snippet.title, " | Galore TV", ""),
			desc: video.snippet.description,
			date: video.snippet.publishedAt,
			thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_sddefault: hiRes(video.snippet.thumbnails, video),
		}
	});
};

function processLatest(videos) {
	return videos.filter(video => !isPrivate(video)).map(function(video) {

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			id: video.id,
			url: video.id,
			title: replaceAll(video.snippet.title, " | Galore TV", ""),
			desc: video.snippet.description,
			date: video.snippet.publishedAt,
			thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_sddefault: hiRes(video.snippet.thumbnails, video),
		}
	});
};

function processIds(arr) {
	return arr.filter(video => !isPrivate(video)).map(function(items) {
		return {
			url: items.id.videoId,
		}
	});
};

function processShows(playlists) {
	return playlists.filter(playlist => !isPrivate(playlist)).map(function(playlist) {
		
		function makeSlug(title) {
		    var str = title;
		        str = str.replace(/[^a-zA-Z0-9\s]/g,"");
		        str = str.toLowerCase();
		        str = str.replace(/\s/g,'-');
		        str = str.replace(/^-+|-+$|(-)+/g, '$1');
		        return str;
		}

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			id: playlist.id,
			url: playlist.id,
			title: replaceAll(playlist.snippet.title, " | Galore TV", ""),
			desc: playlist.snippet.description,
			date: playlist.snippet.publishedAt,
			slug: makeSlug(playlist.snippet.title),
			thumb_mqdefault: hiRes(playlist.snippet.thumbnails, playlist),
			thumb_hqdefault: hiRes(playlist.snippet.thumbnails, playlist),
			thumb_sddefault: hiRes(playlist.snippet.thumbnails, playlist),
			
			// thumb: cloudinary.url("tv/shows/posters/"+makeSlug(playlist.snippet.title)+".jpg", {dpr: 2.0, secure: true, width: 320, height: 180, crop: 'fill', flags: ["lossy", "progressive"], quality: 70, fetch_format: "auto"}),
			// thumbLg: cloudinary.url("tv/shows/posters/"+makeSlug(playlist.snippet.title)+".jpg", {dpr: 2.0, secure: true, width: 1280, height: 720, crop: 'fill', flags: ["lossy", "progressive"], quality: 70, fetch_format: "auto"})
		}
	});
};

function processList(videos) {

	return videos.filter(video => !isPrivate(video)).map(function(video) {

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: video.snippet.resourceId.videoId,
			id: video.snippet.resourceId.videoId,
			title: replaceAll(video.snippet.title, " | Galore TV", ""),
			desc: video.snippet.description,
			date: video.snippet.publishedAt,
			listId: video.snippet.playlistId,
			thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_sddefault: hiRes(video.snippet.thumbnails, video),
		}
	});
};

function processDifferent(videos) {

	return videos.filter(video => !isPrivate(video)).map(function(video) {

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: video.id.videoId,
			id: video.id.videoId,
			title: replaceAll(video.snippet.title, " | Galore TV", ""),
			desc: video.snippet.description,
			date: video.snippet.publishedAt,
			listId: video.snippet.playlistId,
			thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_sddefault: hiRes(video.snippet.thumbnails, video),
		}
	});
};


function processFeatures(videos) {

	return videos.filter(video => !isPrivate(video)).map(function(video) {

		function hiRes(img) {
			if (('maxres' in img) == true) {
				return video.snippet.thumbnails.maxres.url;
			} else {
				return video.snippet.thumbnails.high.url;
			}
		}

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: video.snippet.resourceId.videoId,
			title: replaceAll(video.snippet.title, " | Galore TV", ""),
			id: video.snippet.resourceId.videoId,
			featured: true,
			hero: hiRes(video.snippet.thumbnails)
			// hero: video.snippet.thumbnails.high.url
		}
	});
};

function processSpecials(videos) {

	return videos.filter(video => !isPrivate(video)).map(function(video) {
		
		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: video.snippet.resourceId.videoId,
			id: video.snippet.resourceId.videoId,
			title: replaceAll(video.snippet.title, " | Galore TV", ""),
			desc: video.snippet.description,
			date: video.snippet.publishedAt,
			special: true,
			listId: video.snippet.playlistId,
			thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_sddefault: hiRes(video.snippet.thumbnails, video),
		}
	});
};

function processOther(videos) {
	return videos.filter(video => !isPrivate(video)).map(function(video) {

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: video.snippet.resourceId.videoId,
			id: video.snippet.resourceId.videoId,
			title: replaceAll(video.snippet.title, " | Galore TV", ""),
			desc: video.snippet.description,
			date: video.snippet.publishedAt,
			listId: video.snippet.playlistId,
			thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
			thumb_sddefault: hiRes(video.snippet.thumbnails, video),
		}
	});
};

module.exports = {
	convertToCSV: convertToCSV,
    process: process,
	processIds: processIds,
	processDifferent: processDifferent,
	processLatest: processLatest,
    processList: processList,
    processFeatures: processFeatures,
    processSpecials: processSpecials,
    processOther: processOther,
    processShows: processShows
}