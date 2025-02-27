import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import ProfilePage from "../../app/Profile/page";
import '@testing-library/jest-dom'

describe('ProfilePage', () => {
  // Test 1: Rendering
  it('renders the profile page correctly', () => {
    render(<ProfilePage />);

    // Checks if the default profile pic is rendered
    const defaultAvatar = screen.getByAltText("Profile");
    expect(defaultAvatar).toBeInTheDocument();
    expect(defaultAvatar).toHaveAttribute('src', '/pics/bunny.jpeg');

    // Checks if the form place holders are rendering properly 
    expect(screen.getByPlaceholderText("Child's name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Month")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Year")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Child's level")).toBeInTheDocument();

    // Checks if the save and delete buttons are rendering properly 
    expect(screen.getByText("Delete Profile")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  // Test 2: profile pic selction
  it('updates the selected avatar when an avatar is clicked', async () => {
    render(<ProfilePage />);
    const user = userEvent.setup();

    // Get all profile pics
    const avatars = screen.getAllByAltText("avatar");

    // Selects the second pic (index 1)
    await user.click(avatars[1]);

    // Checks if the profile image updates
    const selectedAvatar = screen.getByAltText("Profile");
    expect(selectedAvatar).toHaveAttribute('src', '/pics/coolcat.jpeg');
  });


  // Test 3: Input updates
  it('updates the form inputs when typing', async () => {
    render(<ProfilePage />);
    const user = userEvent.setup();

    // Types into the name input
    const nameInput = screen.getByPlaceholderText("Child's name");
    await user.type(nameInput, "John Doe");
    expect(nameInput).toHaveValue("John Doe");

    // Types into the month input
    const monthInput = screen.getByPlaceholderText("Month");
    await user.type(monthInput, "January");
    expect(monthInput).toHaveValue("January");

    // Types into the year input
    const yearInput = screen.getByPlaceholderText("Year");
    await user.type(yearInput, "2020");
    expect(yearInput).toHaveValue("2020");

    // Types into the level input
    const levelInput = screen.getByPlaceholderText("Child's level");
    await user.type(levelInput, "Beginner");
    expect(levelInput).toHaveValue("Beginner");
  });

  // Test 4: Save button
  it('triggers the save action when the save button is clicked', () => {
    render(<ProfilePage />);

    // alert function
    window.alert = jest.fn();

    // Clicks the save button
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    // Checks if the alert is triggered
    expect(window.alert).toHaveBeenCalledWith("Profile saved!");
  });

  // Test 5: Delete button
  it('triggers the delete action when the delete button is clicked', () => {
    render(<ProfilePage />);

    // alert function
    window.alert = jest.fn();

    // Clicks the delete button
    const deleteButton = screen.getByText("Delete Profile");
    fireEvent.click(deleteButton);

    // Check if the alert is triggered
    expect(window.alert).toHaveBeenCalledWith("Profile deleted!");
  });
});
