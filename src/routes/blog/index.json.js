import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug,
		creationDate: post.creationDate ?? '',
        modificationDate: post.modificationDate ?? '',
        category: post.category ?? '',
        tags: post.tags ?? '',
        readingTime: post.readingTime,
        draft: post.draft ?? false,
        author: post.author ?? 'Andreas Lauhard',
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}