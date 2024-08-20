<img src="images/wlcmedia.png" alt="wlcmedia" width="100%">

# Hi there, welcome to WLC Media 👋

WLC Media is a digital platform that connects brands with talent for social media product endorsements. The website includes an admin CMS feature that allows businesses to efficiently manage talent data and streamline their campaigns. If you would like to view the frontend design, you can clone the frontend branch from the repository.

## Installation Instructions
The tools that need to be installed are Node.js (version 14.x or higher), npm, and postgreSQL.

1. Create a new folder with any name and navigate to the directory of the new folder.
2. Right-click and select Open in Terminal.
3. Clone the repository:

    ```bash
    git clone https://github.com/talithaalda/your-nextjs-project.git
    ```

4. Navigate into the project directory:

    ```bash
    cd your-nextjs-project
    ```

5. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```
### Connecting to PostgreSQL Database

1. Create a new PostgreSQL database:

    ```sql
    CREATE DATABASE your_database_name;
    ```

2. Update the `.env` file in the root of your project with your PostgreSQL connection string:

    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name
    ```

   Replace `user`, `password`, `localhost`, and `your_database_name` with your actual PostgreSQL credentials.

### Running Database Migrations and Seed

1. Run the Prisma migration to create your database schema:

    ```bash
    npx prisma migrate dev
    ```

2. Seed the database with initial data:

    ```bash
    npx prisma db seed
    ```
    
### Development

To start the development server, run:

```bash
npm run dev
# or
yarn dev

### Admin Login

To access the admin panel, navigate to:

- **URL**: `http://localhost:3000/admin/login`

Use the following credentials to log in:

- **Name**: `Admin`
- **Email**: `wlcmedia@gmail.com`
