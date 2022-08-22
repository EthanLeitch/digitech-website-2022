from passlib.hash import bcrypt
from getpass import getpass

# Load .env file 
import dotenv 
from dotenv import dotenv_values
config = dotenv_values(".env")

# Read value from dotenv file
# print(config["KEY"])

hasher = bcrypt.using(rounds=14)  # Change default round number to be longer (more secure)


def main():
    print("Welcome to the setup program for the digitech-website-2022 app.")
    print("""
    1. Run all options 
    2. Set only the MySQL username and password that the webapp uses  
    3. Set only the admin username and password for the webapp admin panel
    4. Quit""")
    choice = input(" > ")

    # TODO: This looks bad, but it works. Maybe clean this up if more menu options are necessary.
    if choice == "4":
        exit()

    if choice == "1" or choice == "2":
        print("Enter MySQL username and password. NOTE: This will not be encrypted.")
        set_user_and_pass("MYSQL")
        
        if choice == "2":
            exit()
    
    print("Enter admin username and password")
    set_user_and_pass("WEBAPP")


def set_user_and_pass(option):
    username = input("Username: ")
    password = getpass()

    # Only webapp password can be encrypted.
    if option == "WEBAPP":        
        password = hasher.hash(password)
        # $2b$13$H9.qdcodBFCYOWDVMrjx/uT.fbKzYloMYD7Hj2ItDmEOnX5lw.BX.
        # \__/\/ \____________________/\_____________________________/
        # Alg Rounds  Salt (22 char)            Hash (31 char)

    dotenv.set_key(".env", option + "_USERNAME", username)
    dotenv.set_key(".env", option + "_PASSWORD", password)


if __name__ == '__main__':
    main()
