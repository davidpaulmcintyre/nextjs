const Post = (props) => {
  return (
    <div>
      <header class="entry-header">
        <h1 class="entry-title">
          <a
            href="https://howtoember.wordpress.com/2020/06/16/load-balancing-nodejs-with-nginx-on-osx/"
            rel="bookmark"
          >
            Load Balancing NodeJs with Nginx on&nbsp;OSX
          </a>
        </h1>
        <div class="entry-meta">
          <span class="posted-on">
            <a
              href="https://howtoember.wordpress.com/2020/06/16/load-balancing-nodejs-with-nginx-on-osx/"
              rel="bookmark"
            >
              <time
                class="entry-date published"
                datetime="2020-06-16T16:15:05-04:00"
              >
                June 16, 2020
              </time>
            </a>
          </span>
          <span class="byline">
            <span class="author vcard">
              <a
                class="url fn n"
                href="https://howtoember.wordpress.com/author/davidpmcintyre/"
              >
                davidpmcintyre
              </a>
            </span>
          </span>
          <span class="entry-categories">
            <a
              href="https://howtoember.wordpress.com/category/uncategorized/"
              rel="category tag"
            >
              Uncategorized
            </a>
          </span>
          <span class="entry-tags">
            <a
              href="https://howtoember.wordpress.com/tag/load-balancing/"
              rel="tag"
            >
              load balancing
            </a>
            ,{" "}
            <a href="https://howtoember.wordpress.com/tag/nginx/" rel="tag">
              nginx
            </a>
            ,{" "}
            <a href="https://howtoember.wordpress.com/tag/nodejs/" rel="tag">
              nodejs
            </a>
            ,{" "}
            <a href="https://howtoember.wordpress.com/tag/osx/" rel="tag">
              osx
            </a>
          </span>
        </div>
      </header>
      <div class="entry-content">
        <p>
          Here is a POC that is the simplest possible demonstration of how to
          use Nginx as a load balancer for NodeJs servers. It works on OSX and
          has not been tested on Linux. I devised my own POC because the leading
          Google search results on this topic such as{" "}
          <a
            href="https://codeforgeek.com/load-balancing-nodejs-servers-nginx/"
            target="_blank"
            rel="noopener"
          >
            this
          </a>
          ,{" "}
          <a
            href="https://medium.com/@samanbaboli/how-to-load-balancing-nodejs-apps-using-nginx-a3b4ceb7c782"
            target="_blank"
            rel="noopener"
          >
            this
          </a>
          , and{" "}
          <a
            href="https://stackoverflow.com/questions/24627117/load-balancing-in-nodejs"
            target="_blank"
            rel="noopener"
          >
            this
          </a>{" "}
          involve using{" "}
          <a href="https://pm2.keymetrics.io/" target="_blank" rel="noopener">
            pm2
          </a>{" "}
          which I could not get to work, perhaps because I was testing on my
          MacBook’s OSX operating system. In any case, I would prefer not to
          have to introduce a dependency such as pm2 that I might not use in a
          production environment. In prod, where I would be deploying on a EC2’s
          Linux os in AWS, I would probably be using Docker containers and a
          solution managed by AWS. The purpose of this POC is to test my nginx
          and node configurations.
        </p>
        <p>
          My code is a public GitHub{" "}
          <a
            href="https://github.com/davidpaulmcintyre/load-balancer"
            target="_blank"
            rel="noopener"
          >
            repo
          </a>{" "}
          that a single file, server.js, and its only package.json dependency is
          express.
        </p>
        <p>
          After cloning my repo, you can easily test it:
          <br />
          <code>
            <br />
            npm install
            <br />
            npm run start
            <br />
          </code>
          <br />
          which should start node servers running on ports 3000 and 3001. The
          ‘start’ command starts 2 instances of node with the command:
          <br />
          <code>
            <br />
            "start": "PORT=3000 node server.js &amp; PORT=3001 node server.js",
            <br />
          </code>
          <br />
          Using a simple ampserand results in the 2 node processes starting in
          parallel. If successful, you should be able to open multiple browser
          tabs and navigate to both{" "}
          <a href="http://localhost:3000" rel="nofollow">
            http://localhost:3000
          </a>{" "}
          and{" "}
          <a href="http://localhost:3001" rel="nofollow">
            http://localhost:3001
          </a>
          . The requested page should display the port number of the server that
          responded to the request.
        </p>
        <p>
          You will need to{" "}
          <a
            href="https://coderwall.com/p/dgwwuq/installing-nginx-in-mac-os-x-maverick-with-homebrew"
            target="_blank"
            rel="noopener"
          >
            install nginx
          </a>{" "}
          separately. You will need to edit nginx’s <code>nginx.conf</code>{" "}
          file, which for me was located at <code>/usr/local/etc/nginx</code>.
          The local nginx server should have the following configuration mapping
          port 80 to ports 3000 and 3001:
        </p>
        <pre>
          <code>
            {`
http {
  # the 'loadbalancer' name can be any random string but 
  # must match proxy_pass value
  upstream loadbalancer {
    # ip_hash;
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
  }
  server {
    listen       80;
    server_name  localhost; 
    location / {
      proxy_pass http://loadbalancer;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
`}
          </code>
        </pre>
        <p>
          Of course, you can use as many node instances as you want at whatever
          ports that you want, as long as they match the port numbers in your{" "}
          <code>package.json</code>. By default, nginx will use a round-robin
          pattern of balancing, so that repeated refreshes of the browser window
          should alternate between being handled by ports 3000 and 3001.
        </p>
        <p>
          To enable sticky sessions, un-comment the ‘ip_hash’ line. This will
          result in all local requests being handled by the node server at 3000.
        </p>
      </div>
    </div>
  );
};

export default Post;
