document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('formToast');
    const chips = document.querySelectorAll('.chip[data-chip]');

    // Toggle chip selection
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('is-selected');
        });
    });

    const showToast = (message) => {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
    };

    const setInvalid = (field, invalid) => {
        if (!field) return;
        const wrapper = field.closest('.field');
        if (!wrapper) return;
        wrapper.classList.toggle('invalid', invalid);
    };

    const validatePhone = (value) => {
        if (!value) return true;
        return /^0[0-9]{8,10}$/.test(value.trim());
    };

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let valid = true;

            const nameField = form.fullname;
            const emailField = form.email;
            const phoneField = form.phone;
            const messageField = form.message;

            if (!nameField.value.trim()) {
                valid = false;
                setInvalid(nameField, true);
            } else {
                setInvalid(nameField, false);
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                valid = false;
                setInvalid(emailField, true);
            } else {
                setInvalid(emailField, false);
            }

            if (!validatePhone(phoneField.value)) {
                valid = false;
                setInvalid(phoneField, true);
            } else {
                setInvalid(phoneField, false);
            }

            if (!messageField.value.trim()) {
                valid = false;
                setInvalid(messageField, true);
            } else {
                setInvalid(messageField, false);
            }

            if (!valid) {
                showToast('Vui lòng kiểm tra lại thông tin.');
                return;
            }

            const interests = Array.from(document.querySelectorAll('.chip.is-selected'))
                .map(chip => chip.dataset.chip);

            const payload = {
                fullname: nameField.value.trim(),
                email: emailField.value.trim(),
                phone: phoneField.value.trim(),
                message: messageField.value.trim(),
                preferredDate: form.preferredDate.value,
                interests,
            };

            console.table(payload);
            form.reset();
            chips.forEach(chip => chip.classList.remove('is-selected'));
            showToast('Cảm ơn bạn! Concierge sẽ liên hệ trong 15 phút.');
        });
    }
});

