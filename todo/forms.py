from django import forms


class TodoForm(forms.Form):
    title = forms.CharField(
        max_length=100,
        widget=forms.TextInput(
            attrs={'class': 'form-control',
                   'placeholder': 'Enter todo e.g',
                   'aria-label': 'Todo',
                   'aria-describedby': 'add-btn'}
        )
    )
