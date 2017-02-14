import Model from './Model';
import converter from '../utilities/showdown-converter';

interface PostProps {
  title: string;
  slug?: string;
  subtitle?: string;
  tags?: string[];
  body: string;
}

class Post extends Model {
  public title: string;
  public slug: string;
  public subtitle: string;
  public tags: string[];
  public body: string;

  constructor(props: PostProps) {
    super();

    this.title = props.title;
    this.slug = props.slug || '';
    this.subtitle = props.subtitle || '';
    this.tags = props.tags || [];
    this.body = props.body;
  }

  public static fetchRemote(url: string) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.text())
        .then(text => resolve(new Post({
          body: converter.makeHtml(text),
          title: "I Made fetch happen."
        })))
        .catch(err => reject(err));
    });
  }
}

export default Post;
